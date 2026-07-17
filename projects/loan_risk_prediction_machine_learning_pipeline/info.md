---
title: "Loan Risk Prediction ML Pipeline (LightGBM + FLAML + MLflow)"
slug: loan-risk-prediction-pipeline
role: ML Engineer (personal project)
summary: "End-to-end loan risk prediction pipeline: data ingestion, preprocessing, LightGBM training, FLAML hyperparameter tuning, MLflow tracking, Docker, and CI/CD retraining via GitHub Actions."
outcome: "83.78% accuracy with automated drift retraining; served as a REST API via MLflow + Docker."
stack:
  - Python
  - LightGBM
  - FLAML AutoML
  - MLflow
  - Docker
  - GitHub Actions
  - Streamlit
links:
  github: https://github.com/birehan/Loan-Risk-Prediction-Pipeline
order: 3
date: "Sep 2024"
---

# Loan Risk Prediction ML Pipeline

**83.78% accuracy on loan default risk, with automated drift retraining.** An end-to-end pipeline that predicts loan application risk and covers the full workflow from data ingestion to a served, versioned model.

## The problem

Loan default risk depends on many signals spread across separate datasets (loan details, payment history, and underwriting variables). A one-off notebook model goes stale as data drifts and is hard to serve or reproduce.

## What I built

- **Data pipeline:** ingestion from multiple CSV sources, schema validation, missing-value handling, correlation pruning, and an 80/20 split.
- **Modeling:** LightGBM with hyperparameters tuned automatically by FLAML AutoML, evaluated on accuracy, precision, and recall with feature-importance analysis.
- **Experiment tracking:** MLflow logs model versions, hyperparameters, and metrics for reproducibility.
- **Serving:** the model is containerized with Docker and served as a REST API through the MLflow registry.
- **Automated retraining:** GitHub Actions retrains on fresh data monthly (with FLAML re-tuning) to handle drift, then rebuilds and pushes the container.
- **Dashboard:** a Streamlit app to visualize predictions and key metrics.

## Stack

Python, LightGBM, FLAML AutoML, MLflow, Docker, GitHub Actions, Streamlit, with deploy options for AWS SageMaker, Databricks, Google Cloud, or Render.

[GitHub repo](https://github.com/birehan/Loan-Risk-Prediction-Pipeline)
