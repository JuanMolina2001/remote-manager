from winpty import PtyProcess
import asyncio
from websockets.asyncio.server import  ServerConnection
import json
class Terminal:
    def __init__(self, websocket: ServerConnection):
        self.websocket = websocket
        self.process = PtyProcess.spawn("cmd.exe")
    
    def write(self, data):
        self.process.write(data)

    async def read(self):
        print('read started')
        try:
            while True:
                data = await asyncio.to_thread(self.process.read, 1024) 
                if not data:
                    break
                await self.websocket.send(json.dumps({'type': 'output', 'data': data}))
        except Exception as e:
            print(f"Error leyendo el proceso: {e}")
        finally:
            self.process.close()
    def resize(self, rows, cols):
        self.process.setwinsize(rows, cols)