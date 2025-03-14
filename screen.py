import pyautogui
import base64
from io import BytesIO
import json
from websockets.asyncio.server import  ServerConnection
import asyncio

class Screen:
    def __init__(self, websocket: ServerConnection):
        self.websocket = websocket
    async def stream(self):
        print('stream started')
        count = 0
        width, height = pyautogui.size()
        while True:
            count += 1
            print(count)
            try:
                sc = pyautogui.screenshot(region= (0, 0, width, height))
                buffer = BytesIO()
                sc.save(buffer, format="JPEG", quality=85)
                imagen_base64 = base64.b64encode(buffer.getvalue()).decode()
                await self.websocket.send(json.dumps({'type': 'image', 'data': imagen_base64, }))
                await asyncio.sleep(0.05)
            except Exception as e:
                print(e)
                break