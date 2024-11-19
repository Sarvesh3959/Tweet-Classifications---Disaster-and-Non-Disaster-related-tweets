# Tweet-Classifications---Disaster-and-Non-Disaster-related-tweets
This project leverages Natural Language Processing (NLP) techniques and transformer models (DistilBERT) to classify tweets as disaster-related or non-disaster-related. The system is designed for real-time disaster monitoring to assist emergency responders and organizations in prioritizing critical events.

---

## **Features**
- **Real-Time Tweet Classification**: Classifies tweets dynamically into disaster-related or not.
- **Transformer Model Integration**: Fine-tuned DistilBERT for high accuracy.
- **Web-Based Interface**: Intuitive web application for easy input and result visualization.
- **Scalability**: Designed to handle large volumes of tweet data using Flask for connectivity between the model and the webpage.
- **Deployment-Ready**: Dockerized for efficient deployment.

---

## **Table of Contents**
1. [Introduction](#introduction)
2. [Dataset](#dataset)
3. [Model Architecture](#model-architecture)
4. [Preprocessing](#preprocessing)
5. [Web Interface](#web-interface)
6. [How to Run](#how-to-run)
7. [Future Enhancements](#future-enhancements)

---

## **Introduction**
Social media platforms like Twitter play a crucial role during disasters by providing real-time updates. However, the vast amount of data can be overwhelming. This project addresses this challenge by using machine learning to filter and classify disaster-related tweets. The end goal is to help emergency responders act on relevant information quickly.

---

## **Dataset**
- **Source**: Public disaster-related tweet datasets (e.g., Kaggle).
- **Structure**: Contains `text` and `target` columns where `target` = 1 indicates disaster-related tweets and `target` = 0 indicates non-disaster-related tweets.
- **Test Data**: Includes only the `text` column for evaluation.

---

## **Model Architecture**
- **Base Model**: DistilBERT, a lightweight version of BERT for faster performance.
- **Customizations**: Fine-tuned for sequence classification.
- **Evaluation Metrics**: Accuracy, Precision, Recall, F1-Score.
- **Hyperparameter Tuning**: Achieved improved accuracy through grid search on learning rate, batch size, and epochs.

---

## **Preprocessing**
1. Tokenization using Hugging Face's Transformers library.
2. Removal of stopwords, URLs, and non-alphanumeric characters.
3. Padding and truncation using a data collator for uniform input length.

---

## **Web Interface**
- Built using **Flask** for backend processing.
- Integrated with a React-based frontend for a user-friendly interface.

**Features**:
- Upload a tweet or input text for classification.
- View classification results instantly.

---

## **How to Run**
### **Clone the Repository**
```bash
git clone https://github.com/Sarvesh3959/Tweet-Classifications---Disaster-and-Non-Disaster-related-tweets.git
cd disaster-tweet-detection
