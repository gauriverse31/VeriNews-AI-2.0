"""
analytics.py
============
Research & Telemetry Analytics endpoints for VeriNews AI 2.0.
Provides verified research paper benchmark datasets, ISOT dataset statistics,
validation/bias experiment results, real-time scan telemetry, and architecture data.
"""

from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from fastapi import APIRouter

from app.api.scans import SCAN_STORE

router = APIRouter()

# -------------------------------------------------------------------------
# Documented Research Benchmark Results (From published research papers)
# Kept strictly separate from live model metrics as required.
# -------------------------------------------------------------------------
REPORTED_RESEARCH_RESULTS = [
    {
        "model": "Logistic Regression",
        "key": "lr",
        "accuracy": 98.68,
        "precision": 98.15,
        "recall": 99.08,
        "f1_score": 98.61,
        "type": "Individual Linear Classifier",
        "features": "TF-IDF (50,000 features)",
        "highlight": "Balanced baseline classifier",
        "ranking": 3,
        "benchmark_source": "Research Benchmark (ISOT Corpus)",
    },
    {
        "model": "Linear SVM",
        "key": "svm",
        "accuracy": 98.84,
        "precision": 98.31,
        "recall": 99.24,
        "f1_score": 98.78,
        "type": "Maximum-Margin Classifier",
        "features": "TF-IDF (50,000 features)",
        "highlight": "Highest-Accuracy Individual Model (98.84%)",
        "is_highest_accuracy": True,
        "ranking": 1,
        "benchmark_source": "Research Benchmark (ISOT Corpus)",
    },
    {
        "model": "Random Forest",
        "key": "rf",
        "accuracy": 97.38,
        "precision": 95.74,
        "recall": 98.87,
        "f1_score": 97.28,
        "type": "Ensemble Decision Forest (100 trees)",
        "features": "First 5,000 TF-IDF features",
        "highlight": "Non-linear feature subsampling",
        "ranking": 4,
        "benchmark_source": "Research Benchmark (ISOT Corpus)",
    },
    {
        "model": "Hybrid Ensemble",
        "key": "hybrid",
        "accuracy": 98.79,
        "precision": 98.15,
        "recall": 99.31,
        "f1_score": 98.73,
        "type": "Hard Majority Voting Ensemble (3 Base Classifiers)",
        "features": "Full TF-IDF Multi-Model Consensus",
        "highlight": "Highest-Recall Model (99.31%)",
        "is_highest_recall": True,
        "ranking": 2,
        "benchmark_source": "Research Benchmark (ISOT Corpus)",
    },
]

# Benchmark confusion matrix on held-out test split (8,980 samples, 20% stratified)
HELD_OUT_CONFUSION_MATRIX = {
    "tp": 4254,  # Real news correctly identified
    "tn": 4657,  # Fake news correctly identified
    "fp": 39,    # Fake news incorrectly flagged as real
    "fn": 30,    # Real news incorrectly flagged as fake
    "total_samples": 8980,
    "calculated_accuracy": 99.23,
    "calculated_precision": 99.09,
    "calculated_recall": 99.30,
    "calculated_specificity": 99.17,
}

# ISOT Dataset statistics with verified file counts and reconciliation
ISOT_DATASET_STATS = {
    "dataset_name": "ISOT Fake News Dataset (University of Victoria)",
    "prepared_records": 44689,
    "raw_records": 44898,
    "reconciliation": {
        "raw_total": 44898,
        "true_csv_records": 21417,
        "fake_csv_records": 23481,
        "prepared_total": 44689,
        "deduplicated_records_removed": 209,
        "explanation": (
            "The raw dataset on disk contains 44,898 records (True.csv: 21,417; Fake.csv: 23,481). "
            "During preprocessing, exact title+body deduplication and removal of empty text rows "
            "eliminate exactly 209 redundant entries, resulting in 44,689 unique, prepared articles "
            "used for training and evaluation. Both numbers are accurate at their respective pipeline stages."
        ),
    },
    "label_mapping": {
        "0": "FAKE",
        "1": "REAL",
    },
    "classes": [
        {
            "name": "Fake News",
            "label": 0,
            "count": 23481,
            "percentage": 52.3,
            "source_files": ["Fake.csv (23,481 raw rows)"],
            "subjects": [
                {"subject": "News", "count": 9050, "percentage": 38.5},
                {"subject": "politics", "count": 6841, "percentage": 29.1},
                {"subject": "left-news", "count": 4459, "percentage": 19.0},
                {"subject": "Government News", "count": 1570, "percentage": 6.7},
                {"subject": "US_News", "count": 783, "percentage": 3.3},
                {"subject": "Middle-east", "count": 778, "percentage": 3.3},
            ],
        },
        {
            "name": "Real News",
            "label": 1,
            "count": 21417,
            "percentage": 47.7,
            "source_files": ["True.csv (21,417 raw rows)"],
            "subjects": [
                {"subject": "politicsNews", "count": 11272, "percentage": 52.6},
                {"subject": "worldnews", "count": 10145, "percentage": 47.4},
            ],
        },
    ],
    "preprocessing_pipeline": [
        {
            "step": 1,
            "name": "Corpus Consolidation & Deduplication",
            "description": "Ingest Fake.csv (23,481) & True.csv (21,417) [44,898 raw]. Filter 209 exact duplicate and empty records to yield 44,689 prepared articles.",
        },
        {
            "step": 2,
            "name": "Source-Marker Sanitization",
            "description": "Explicitly strip publisher markers (e.g. 'WASHINGTON (Reuters) -') to mitigate wire artifact bias.",
        },
        {
            "step": 3,
            "name": "Linguistic Normalization",
            "description": "Case folding, URL stripping, email removal, punctuation filtering, and stop-word elimination.",
        },
        {
            "step": 4,
            "name": "TF-IDF Vectorization",
            "description": "Compute term frequency-inverse document frequency over 50,000 sublinear scaled n-gram features (1,2).",
        },
        {
            "step": 5,
            "name": "Feature Dimension Slicing",
            "description": "Feed full 50k dimensions to Logistic Regression and Linear SVM; slice first 5k features for Random Forest.",
        },
        {
            "step": 6,
            "name": "Ensemble Consensus Mapping",
            "description": "Feed class predictions into Hard Majority Voting aggregator for zero-weight equal voting decision across 3 base classifiers.",
        },
    ],
}

# Documented Research Validation & Bias Analysis Experiments
# Explicitly noted as adversarial bias/robustness stress tests, NOT normal production accuracy
VALIDATION_EXPERIMENTS = [
    {
        "id": "exp-1",
        "title": "Subject-Only Evaluation",
        "score": 100.0,
        "metric": "Accuracy",
        "experiment_type": "Adversarial Bias Stress Test",
        "status": "Severe Metadata Leakage Identified",
        "severity": "critical",
        "finding": (
            "100.0% classification accuracy achieved when providing ONLY the article 'subject' metadata tag."
        ),
        "explanation": (
            "In the ISOT dataset, the subjects for True news ('politicsNews', 'worldnews') do not overlap at all "
            "with Fake news subjects ('News', 'politics', 'Government News', etc.). Classifiers memorize the subject tag "
            "as a perfect shortcut without learning any news text content."
        ),
        "implication": (
            "Proves severe metadata shortcut learning. Subject tags are excluded entirely from production inputs."
        ),
    },
    {
        "id": "exp-2",
        "title": "Source-Marker-Only Evaluation",
        "score": 99.25,
        "metric": "Accuracy",
        "experiment_type": "Publisher Artifact Stress Test",
        "status": "High Shortcut Learning",
        "severity": "warning",
        "finding": (
            "99.25% accuracy achieved evaluating only publisher wire markers (e.g. 'WASHINGTON (Reuters) -')."
        ),
        "explanation": (
            "Almost all real news articles in ISOT originate from Reuters and contain standardized wire datelines. "
            "The model readily exploits the presence of '(Reuters)' to classify articles as real with near-perfect accuracy."
        ),
        "implication": (
            "Demonstrates publisher stylistic artifact bias. Requires explicit regex source-marker sanitization."
        ),
    },
    {
        "id": "exp-3",
        "title": "Source-Neutral Evaluation",
        "score": 98.71,
        "metric": "Accuracy",
        "experiment_type": "De-biased Robustness Test",
        "status": "De-biased Research Benchmark",
        "severity": "info",
        "finding": (
            "Retained 98.71% accuracy after explicit regex removal of Reuters, AP, BBC, and wire city datelines."
        ),
        "explanation": (
            "Even with explicit source markers stripped, the model maintains high accuracy on subtle lexical patterns. "
            "However, source-neutral evaluation does not prove that all latent source bias has been eliminated."
        ),
        "implication": (
            "Demonstrates lexical stylistic signals remain strong, but generalization to other wire services requires ongoing testing."
        ),
    },
    {
        "id": "exp-4",
        "title": "Duplicate-Aware Evaluation",
        "score": 0.0,
        "metric": "Overlap Rate",
        "experiment_type": "Corpus Partition Integrity Test",
        "status": "Clean Data Integrity",
        "severity": "success",
        "finding": (
            "Zero exact normalized text overlap detected between the real and fake news corpuses."
        ),
        "explanation": (
            "Confirmed that no identical news articles were accidentally duplicated across both classes, "
            "preventing label collision and false training memorization."
        ),
        "implication": (
            "Validates corpus partition integrity between genuine and fabricated news stories."
        ),
    },
    {
        "id": "exp-5",
        "title": "Temporal Evaluation",
        "score": None,
        "metric": "Not Performed",
        "experiment_type": "Chronological Generalization Limit",
        "status": "Methodological Limitation",
        "severity": "neutral",
        "finding": (
            "Temporal train/test evaluation was not performed due to date distribution constraints."
        ),
        "explanation": (
            "The publication date distribution in the ISOT dataset does not support a valid two-class chronological split, "
            "as fake and real articles were collected across distinct, partially non-continuous time windows."
        ),
        "implication": (
            "Temporal generalization cannot be claimed. Models may degrade on contemporary 2024-2026 political events."
        ),
    },
]

# Existing Application Modules Definition
APPLICATION_MODULES = [
    {
        "id": "scanner",
        "name": "Live AI Scanner",
        "category": "Core Inference Engine",
        "description": "Multi-factor real-time analysis combining ML ensemble predictions, linguistic heuristics, domain trust, and trigger detection.",
        "icon": "Scan",
        "route": "scanner",
        "status": "Active & Operational",
    },
    {
        "id": "claims",
        "name": "Claim Intel",
        "category": "Fact Verification & Graph",
        "description": "Automated claim extraction, external evidence retrieval, Google Fact Check Tools integration, and investigative claim graphing.",
        "icon": "ShieldAlert",
        "route": "claims",
        "status": "Active & Operational",
    },
    {
        "id": "domain",
        "name": "Domain Intel",
        "category": "Publisher Credibility",
        "description": "Authoritative registry lookup, TLD risk profiling, spoofing detection, and reputation scoring across 100+ cataloged domains.",
        "icon": "Globe",
        "route": "domain",
        "status": "Active & Operational",
    },
    {
        "id": "history",
        "name": "Scan History",
        "category": "Audit Trail & Forensics",
        "description": "Persistent telemetry logging, filtering by threat tier, and forensic investigative PDF/HTML report exports.",
        "icon": "History",
        "route": "history",
        "status": "Active & Operational",
    },
    {
        "id": "dashboard",
        "name": "Analytics Dashboard",
        "category": "Research & Telemetry",
        "description": "Interactive research benchmarks, model comparison, ISOT dataset analytics, bias validation, and scanning trajectories.",
        "icon": "BarChart3",
        "route": "dashboard",
        "status": "Active & Operational",
    },
    {
        "id": "model",
        "name": "Model Studio",
        "category": "ML Diagnostics & Quality",
        "description": "Live model diagnostic tests, Population Stability Index (PSI) drift monitoring, and held-out calibration curves.",
        "icon": "Cpu",
        "route": "model",
        "status": "Active & Operational",
    },
]


def _compute_scan_analytics(scans: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Compute live scan statistics strictly from actual recorded scans.
    If no live scans are recorded, returns explicit Not Available indicators
    and baseline distributions clearly labeled as DEMO DATA.
    """
    total_scans = len(scans)
    
    if total_scans == 0:
        return {
            "total_scans": 0,
            "real_news_count": 0,
            "fake_news_count": 0,
            "high_risk_count": 0,
            "avg_confidence": None,
            "avg_risk_score": None,
            "is_demo_telemetry": True,
            "telemetry_badge": "DEMO DATA — NO LIVE SCANS RECORDED",
            "daily_activity": [
                {"day": "Mon", "scans": 18, "real": 11, "fake": 7, "risk": 38},
                {"day": "Tue", "scans": 24, "real": 15, "fake": 9, "risk": 45},
                {"day": "Wed", "scans": 31, "real": 18, "fake": 13, "risk": 52},
                {"day": "Thu", "scans": 28, "real": 17, "fake": 11, "risk": 40},
                {"day": "Fri", "scans": 36, "real": 22, "fake": 14, "risk": 48},
                {"day": "Sat", "scans": 22, "real": 14, "fake": 8, "risk": 35},
                {"day": "Sun", "scans": 19, "real": 12, "fake": 7, "risk": 32},
            ],
            "risk_distribution": [
                {"name": "Low Risk (0-25)", "count": 58, "color": "#10b981"},
                {"name": "Moderate (26-50)", "count": 48, "color": "#f59e0b"},
                {"name": "High Risk (51-75)", "count": 28, "color": "#f97316"},
                {"name": "Critical (76-100)", "count": 14, "color": "#ef4444"},
            ],
            "confidence_distribution": [
                {"range": "90% - 100%", "count": 86, "category": "High Confidence"},
                {"range": "75% - 89%", "count": 42, "category": "Moderate Confidence"},
                {"range": "50% - 74%", "count": 15, "category": "Low Confidence / Borderline"},
                {"range": "< 50%", "count": 5, "category": "Uncertain / Model Disagreement"},
            ],
            "top_triggers": [
                {"trigger": "Miracle / Secret Cure", "count": 34, "category": "Health Misinfo"},
                {"trigger": "Urgent Share / Forward This", "count": 29, "category": "Viral Clickbait"},
                {"trigger": "Illuminati / Secret Society", "count": 22, "category": "Conspiracy"},
                {"trigger": "Excessive Punctuation (!!!)", "count": 19, "category": "Stylistic"},
                {"trigger": "Guaranteed 100% / Free Crypto", "count": 17, "category": "Financial Scam"},
            ],
        }

    # Calculate real live telemetry from actual scan records
    real_count = 0
    fake_count = 0
    high_risk_count = 0
    confidence_sum = 0.0
    risk_sum = 0.0
    
    risk_tiers = {"low": 0, "moderate": 0, "high": 0, "critical": 0}
    conf_bins = {"90-100": 0, "75-89": 0, "50-74": 0, "below-50": 0}
    trigger_counts: Dict[str, int] = {}
    day_counts: Dict[str, Dict[str, int]] = {
        "Mon": {"scans": 0, "real": 0, "fake": 0},
        "Tue": {"scans": 0, "real": 0, "fake": 0},
        "Wed": {"scans": 0, "real": 0, "fake": 0},
        "Thu": {"scans": 0, "real": 0, "fake": 0},
        "Fri": {"scans": 0, "real": 0, "fake": 0},
        "Sat": {"scans": 0, "real": 0, "fake": 0},
        "Sun": {"scans": 0, "real": 0, "fake": 0},
    }

    days_order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    for scan in scans:
        verdict = str(scan.get("finalVerdict") or scan.get("verdict") or "").upper()
        scores = scan.get("scores") or {}
        risk_score = float(scores.get("riskScore", scan.get("riskScore", 0)))
        confidence = float(scores.get("aiConfidence", scan.get("confidence", 0)))

        risk_sum += risk_score
        confidence_sum += confidence

        # Class classification
        if "REAL" in verdict or "VERIFIED" in verdict:
            real_count += 1
            is_fake = False
        else:
            fake_count += 1
            is_fake = True

        if risk_score >= 50:
            high_risk_count += 1

        # Risk tier
        if risk_score <= 25:
            risk_tiers["low"] += 1
        elif risk_score <= 50:
            risk_tiers["moderate"] += 1
        elif risk_score <= 75:
            risk_tiers["high"] += 1
        else:
            risk_tiers["critical"] += 1

        # Confidence bins
        if confidence >= 90:
            conf_bins["90-100"] += 1
        elif confidence >= 75:
            conf_bins["75-89"] += 1
        elif confidence >= 50:
            conf_bins["50-74"] += 1
        else:
            conf_bins["below-50"] += 1

        # Day of week
        ts = scan.get("timestamp")
        try:
            if ts:
                dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
                day_name = dt.strftime("%a")
                if day_name in day_counts:
                    day_counts[day_name]["scans"] += 1
                    if is_fake:
                        day_counts[day_name]["fake"] += 1
                    else:
                        day_counts[day_name]["real"] += 1
        except Exception:
            pass

        # Triggers
        triggers = scan.get("highlightedTriggers") or {}
        if isinstance(triggers, dict):
            for t in triggers.keys():
                clean_t = str(t).title()
                trigger_counts[clean_t] = trigger_counts.get(clean_t, 0) + 1

    avg_conf = round(confidence_sum / total_scans, 1) if total_scans > 0 else None
    avg_risk = round(risk_sum / total_scans, 1) if total_scans > 0 else None

    # Top triggers list
    sorted_triggers = sorted(trigger_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    top_triggers_list = [
        {"trigger": t[0], "count": t[1], "category": "Detected Heuristic"}
        for t in sorted_triggers
    ]

    daily_activity_list = [
        {
            "day": d,
            "scans": day_counts[d]["scans"],
            "real": day_counts[d]["real"],
            "fake": day_counts[d]["fake"],
            "risk": avg_risk or 0,
        }
        for d in days_order
    ]

    return {
        "total_scans": total_scans,
        "real_news_count": real_count,
        "fake_news_count": fake_count,
        "high_risk_count": high_risk_count,
        "avg_confidence": avg_conf,
        "avg_risk_score": avg_risk,
        "is_demo_telemetry": False,
        "telemetry_badge": "LIVE DATABASE TELEMETRY ACTIVE",
        "daily_activity": daily_activity_list,
        "risk_distribution": [
            {"name": "Low Risk (0-25)", "count": risk_tiers["low"], "color": "#10b981"},
            {"name": "Moderate (26-50)", "count": risk_tiers["moderate"], "color": "#f59e0b"},
            {"name": "High Risk (51-75)", "count": risk_tiers["high"], "color": "#f97316"},
            {"name": "Critical (76-100)", "count": risk_tiers["critical"], "color": "#ef4444"},
        ],
        "confidence_distribution": [
            {"range": "90% - 100%", "count": conf_bins["90-100"], "category": "High Confidence"},
            {"range": "75% - 89%", "count": conf_bins["75-89"], "category": "Moderate Confidence"},
            {"range": "50% - 74%", "count": conf_bins["50-74"], "category": "Low Confidence / Borderline"},
            {"range": "< 50%", "count": conf_bins["below-50"], "category": "Uncertain / Model Disagreement"},
        ],
        "top_triggers": top_triggers_list,
    }


@router.get("/overview")
def get_dashboard_overview():
    """Return all 8 required KPI cards and aggregate system overview."""
    telemetry = _compute_scan_analytics(SCAN_STORE)

    return {
        "kpi": {
            "total_news_scans": {
                "value": telemetry["total_scans"] if telemetry["total_scans"] > 0 else 0,
                "display": str(telemetry["total_scans"]) if telemetry["total_scans"] > 0 else "0",
                "label": "Total News Scans",
                "subtext": "Scans recorded in backend telemetry",
                "change": None,  # No fabricated percentage changes
            },
            "real_news_detected": {
                "value": telemetry["real_news_count"] if telemetry["total_scans"] > 0 else 0,
                "display": str(telemetry["real_news_count"]) if telemetry["total_scans"] > 0 else "0",
                "label": "Real News Detected",
                "subtext": (
                    f"{round((telemetry['real_news_count'] / telemetry['total_scans']) * 100, 1)}% of audited corpus"
                    if telemetry["total_scans"] > 0
                    else "0% of audited corpus"
                ),
                "change": None,
            },
            "fake_news_detected": {
                "value": telemetry["fake_news_count"] if telemetry["total_scans"] > 0 else 0,
                "display": str(telemetry["fake_news_count"]) if telemetry["total_scans"] > 0 else "0",
                "label": "Fake News Detected",
                "subtext": (
                    f"{round((telemetry['fake_news_count'] / telemetry['total_scans']) * 100, 1)}% flagged as misinformation"
                    if telemetry["total_scans"] > 0
                    else "0% flagged as misinformation"
                ),
                "change": None,
            },
            "avg_model_confidence": {
                "value": (
                    f"{telemetry['avg_confidence']}%"
                    if telemetry["avg_confidence"] is not None
                    else "Not Available"
                ),
                "numeric_value": telemetry["avg_confidence"],
                "label": "Average Model Confidence",
                "subtext": "Live inference confidence mean" if telemetry["avg_confidence"] is not None else "No live scans recorded",
                "change": None,
            },
            "total_research_records": {
                "value": 44689,
                "raw_records": 44898,
                "label": "Total Research Dataset Records",
                "subtext": "44,689 prepared articles (44,898 raw on disk)",
                "change": None,
            },
            "model_composition": {
                "value": "3 Base + 1 Ensemble",
                "label": "Model Composition",
                "subtext": "3 Base Classifiers (LR, SVM, RF) + 1 Hybrid Ensemble",
                "base_classifiers": 3,
                "ensemble": 1,
                "note": "Hybrid ensemble is a consensus layer, not a 4th independent algorithm.",
                "change": None,
            },
            "hybrid_model_accuracy": {
                "value": "98.79%",
                "numeric_value": 98.79,
                "label": "Hybrid Model Accuracy",
                "subtext": "Reported Hard Majority Voting benchmark",
                "change": None,
            },
            "high_risk_news_count": {
                "value": telemetry["high_risk_count"] if telemetry["total_scans"] > 0 else 0,
                "display": str(telemetry["high_risk_count"]) if telemetry["total_scans"] > 0 else "0",
                "label": "High-Risk News Count",
                "subtext": "Risk index >= 50 in telemetry",
                "change": None,
            },
        },
        "research_benchmarks_highlight": {
            "svm_accuracy": "98.84%",
            "svm_note": "Highest-Accuracy Individual Model",
            "hybrid_accuracy": "98.79%",
            "hybrid_accuracy_note": "Hard Majority Voting Benchmark",
            "hybrid_recall": "99.31%",
            "hybrid_recall_note": "Highest-Recall Model (Minimizes False Negatives)",
        },
        "is_demo_telemetry": telemetry["is_demo_telemetry"],
        "telemetry_badge": telemetry["telemetry_badge"],
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/research-results")
def get_research_results():
    """
    Return documented research paper benchmark metrics and confusion matrix.
    Separated from live model telemetry as requested.
    """
    return {
        "dataset_name": "ISOT Fake News Corpus (University of Victoria)",
        "models": REPORTED_RESEARCH_RESULTS,
        "benchmark_confusion_matrix": HELD_OUT_CONFUSION_MATRIX,
        "voting_strategy": {
            "name": "Hard Majority Voting",
            "formula": "mode([pred_LR, pred_SVM, pred_RF])",
            "description": "Each of the 3 base algorithms casts an unweighted discrete class vote (0 = FAKE, 1 = REAL). "
                           "The final prediction is selected by absolute majority consensus (>= 2 votes). "
                           "This is discrete hard label voting, not soft probability averaging.",
        },
        "key_findings": {
            "highest_accuracy_individual": "Linear SVM (98.84%)",
            "highest_recall_model": "Hybrid Ensemble (99.31%)",
            "highest_precision_model": "Linear SVM (98.31%)",
            "overall_conclusion": (
                "Linear SVM achieves the highest individual accuracy (98.84%), while the Hybrid Ensemble achieves the highest recall (99.31%), "
                "substantially reducing false negatives where fake news escapes detection."
            ),
        },
    }


@router.get("/dataset")
def get_dataset_analytics():
    """Return ISOT dataset statistics, class distribution, and data preprocessing workflow."""
    return ISOT_DATASET_STATS


@router.get("/validation-experiments")
def get_validation_experiments():
    """
    Return documented research validation experiments and bias vulnerability findings.
    Explicitly noted as adversarial bias/robustness stress tests, not production accuracy.
    """
    return {
        "experiments": VALIDATION_EXPERIMENTS,
        "experiment_nature": "Adversarial Bias & Robustness Stress Tests (Not Normal Production Accuracy)",
        "critical_warnings": [
            "Subject-only 100% accuracy exposes severe metadata shortcut learning caused by disjoint subject tags.",
            "Source-marker-only 99.25% accuracy indicates heavy reliance on standardized wire datelines (e.g. Reuters).",
            "Source-neutral evaluation (98.71%) removes explicit markers, but does not prove total source independence.",
            "Temporal validation was not performed; out-of-distribution temporal degradation is expected on current news.",
        ],
    }


@router.get("/modules")
def get_application_modules():
    """Return overview of all application modules and their status."""
    return {
        "modules": APPLICATION_MODULES,
        "total_modules": len(APPLICATION_MODULES),
    }


@router.get("/detection-trends")
def get_detection_trends():
    """Return scanning activity trends, risk distribution, and detected manipulation triggers."""
    return _compute_scan_analytics(SCAN_STORE)


@router.get("/full")
def get_full_analytics():
    """Aggregate all analytics sections in a single request."""
    telemetry = _compute_scan_analytics(SCAN_STORE)
    
    return {
        "overview": {
            "kpi": {
                "total_news_scans": telemetry["total_scans"],
                "real_news_detected": telemetry["real_news_count"],
                "fake_news_detected": telemetry["fake_news_count"],
                "avg_model_confidence": telemetry["avg_confidence"],
                "total_research_records": 44689,
                "raw_research_records": 44898,
                "model_composition": "3 Base + 1 Ensemble",
                "hybrid_model_accuracy": 98.79,
                "high_risk_news_count": telemetry["high_risk_count"],
            },
            "research_benchmarks_highlight": {
                "svm_accuracy": 98.84,
                "hybrid_accuracy": 98.79,
                "hybrid_recall": 99.31,
            },
            "is_demo_telemetry": telemetry["is_demo_telemetry"],
            "telemetry_badge": telemetry["telemetry_badge"],
        },
        "research_results": REPORTED_RESEARCH_RESULTS,
        "benchmark_confusion_matrix": HELD_OUT_CONFUSION_MATRIX,
        "dataset_analytics": ISOT_DATASET_STATS,
        "validation_experiments": VALIDATION_EXPERIMENTS,
        "application_modules": APPLICATION_MODULES,
        "detection_trends": telemetry,
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
    }
