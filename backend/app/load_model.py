import os
import gdown

def download_model(model_url, model_path):
    gdown.download(model_url, model_path, quiet=False)

def load_model():
    model_path = './model/best.pt'
    model_url = 'https://drive.google.com/uc?id=1nwfR1bFcRx3nBbH5zR-993j1m_yucUma'

    if not os.path.exists(model_path):
        print(f"Downloading model from Google Drive...")
        download_model(model_url, model_path)

    print("Model path:", model_path)
    return model_path
