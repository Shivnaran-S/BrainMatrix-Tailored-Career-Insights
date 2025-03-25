import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
import os
from django.conf import settings
import random

def train_and_save_model():
    # This is sample data - in a real app, you'd use actual user responses
    # Generate synthetic data for demonstration
    data = {
        'q1': [random.randint(1, 5) for _ in range(100)],
        'q2': [random.randint(1, 5) for _ in range(100)],
        'q3': [random.randint(1, 5) for _ in range(100)],
        'q4': [random.randint(1, 5) for _ in range(100)],
        'q5': [random.randint(1, 5) for _ in range(100)],
        'career_path': [random.randint(1, 5) for _ in range(100)]  # 5 career paths
    }
    
    df = pd.DataFrame(data)
    X = df.drop('career_path', axis=1)
    y = df['career_path']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    
    # Save the model
    model_path = os.path.join(settings.BASE_DIR, 'courses', 'ml_model', 'classifier.pkl')
    joblib.dump(model, model_path)
    
    print(f"Model trained and saved to {model_path}")
    print(f"Test accuracy: {model.score(X_test, y_test)}")

if __name__ == "__main__":
    train_and_save_model()