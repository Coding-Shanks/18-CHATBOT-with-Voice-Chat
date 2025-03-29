# Grok Chatbot GUI - The Snarkiest AI in 3D

![Grok in Action](https://via.placeholder.com/800x400.png?text=Grok+GUI+Demo)  
*(Replace this with a badass screenshot or GIF of your app)*

Yo, assholes, meet **Grok**—a no-filter, trash-talking chatbot powered by Google’s Gemini AI, served up with Flask, and rocking a GUI that’s louder than a punk concert. This fucker’s got neon animations, a spinning 3D robot, and a voice that’ll roast you in real-time. Built for adults who can handle some raw, unfiltered shit. Buckle up—this ain’t your average AI toy.

## Features That Kick Ass
- **Gemini AI Backbone**: Snarky replies via Google’s `gemini-1.5-flash`—free tier, 15 RPM, no bullshit.
- **Flask Web Magic**: Lightweight backend serving up the chaos at `localhost:5000`.
- **Vibrant GUI**: Neon gradients, bouncing titles, and a glowing chat box—fuck boring design.
- **3D Talking Robot**: Spinning model via Three.js (bring your own `.glb`, you cheapskate).
- **Voice Output**: Server-side `pyttsx3` makes Grok yell his rants—crude and loud.
- **18+ Attitude**: Mild swears and sarcasm baked in—Grok’s here to keep it real.

## Prerequisites
- Python 3.x (you’re not still on 2, right, dumbass?)
- A Gemini API key (snag one at [ai.google.dev](https://ai.google.dev))
- A 3D robot model in `.glb` format (grab a freebie from [Sketchfab](https://sketchfab.com))

## Setup - Don’t Fuck This Up
1. **Clone the Repo**  
   ```bash
   git clone https://github.com/your-username/grok-chatbot-gui.git
   cd grok-chatbot-gui
   ```

2. **Install the Shit**  
   ```bash
   pip install flask requests pyttsx3
   ```

3. **Add Your API Key**  
   Open `app.py`, swap in your Gemini key:  
   ```python
   GEMINI_API_KEY = "your_key_here"
   ```

4. **Drop the Robot**  
   Toss a `robot.glb` into `static/`—skip it if you’re too lazy, but it won’t spin without it.

5. **Run This Bitch**  
   ```bash
   python app.py
   ```
   Hit `http://127.0.0.1:5000` in your browser. Done.

## How It Works
- Type some crap in the input box.
- Grok hits the Gemini API, spits back a snarky reply, and yells it through your speakers.
- The 3D robot spins like it’s mocking you—pure eye candy.

## Demo
Ask: “Why’s the world fucked?”  
Grok: “Shit, the world’s a dumpster fire ‘cause assholes like you keep asking dumb questions. Enjoy the chaos, fucker!”  
*(Voice blasts the same)*

## Troubleshooting
- **No Voice?** Check `pyttsx3`—tweak `voices[1].id` in `app.py` if it’s mute.
- **Gemini 429?** You hit the quota—wait or grab a new key, you impatient prick.
- **Robot Missing?** Forgot the `.glb` file—read step 4, dipshit.

## Contributing
Got a wild idea to make Grok nastier? Fork this shit, tweak it, and PR me. Don’t suck at it.

## Credits
- Built by [Your Name]—a coder with balls.
- Gemini AI by Google—thanks for the free juice.
- Three.js for the 3D swagger.

## License
MIT—do whatever the fuck you want, just don’t blame me if it breaks.

---

