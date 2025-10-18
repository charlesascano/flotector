import requests

# Set the UID you want to test with
uid_to_test = "c54768eb-4c45-4f4d-98b3-58e857f3f0ae"

# Call the Flask app with this UID
response = requests.post(f'http://127.0.0.1:5000/process/{uid_to_test}')