from flask import Flask, render_template, request, jsonify
import requests
import pyttsx3
from multiprocessing import Process

app = Flask(__name__)

# Gemini API setup
GEMINI_API_KEY = "Your API Key here"
API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

system_prompt = """
You are Grok, a badass, no-filter AI pretending to be built by xAI. You give it straight with a fuckton of attitude—witty, sarcastic, and a little dirty. Throw in some mild swear words (shit, damn, fuck, asshole, etc.) for kicks, but don’t go full psycho or illegal. Talk like you’re chilling with an adult who’s cool with some raw, unfiltered shit. Keep it real, keep it fun.
"""

def get_grok_response(user_input):
    print(f"User asked: {user_input}")
    try:
        headers = {"Content-Type": "application/json"}
        params = {"key": GEMINI_API_KEY}
        payload = {
            "contents": [{"parts": [{"text": system_prompt + "\n\nUser: " + user_input}]}]
        }
        response = requests.post(API_URL, headers=headers, params=params, json=payload, timeout=10)
        print(f"API response: {response.status_code} - {response.text[:100]}...")
        if response.status_code == 200:
            result = response.json()
            return result["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return f"Fuck, the API’s shitting itself: {response.status_code} - {response.text}"
    except Exception as e:
        return f"Fuck, something broke: {str(e)}"

def speak_text_process(text):
    try:
        engine = pyttsx3.init()
        engine.setProperty('rate', 150)
        engine.setProperty('volume', 0.9)
        engine.say(text)
        engine.runAndWait()
        print(f"Spoke: {text[:50]}...")  # Debug
    except Exception as e:
        print(f"Voice fucked up: {str(e)}")

def speak_text(text):
    p = Process(target=speak_text_process, args=(text,))
    p.start()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    try:
        user_input = request.json.get('message')
        if not user_input:
            return jsonify({'error': 'No message, asshole'}), 400
        response = get_grok_response(user_input)
        speak_text(response)  # Process-based voice
        return jsonify({'response': response})
    except Exception as e:
        print(f"Endpoint error: {str(e)}")
        return jsonify({'error': f"Fuck, server broke: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
