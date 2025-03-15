import asyncio
from websockets.asyncio.server import serve , ServerConnection
from terminal import Terminal
from screen import Screen
import json
import pyautogui
async def handle(websocket: ServerConnection): 
    terminal = Terminal(websocket)
    screen = Screen(websocket)
    # read_task = asyncio.create_task(terminal.read())
    stream_task = asyncio.create_task(screen.stream())
    async for message in websocket:
        data = json.loads(message)
        if data['type'] == 'mouse':
            pyautogui.moveTo(data['data']['x'], data['data']['y'])
        if data['type'] == 'click':
            pyautogui.click()
        if data['type'] == 'right-click':
            pyautogui.rightClick()
        if data['type'] == 'keyDown':
            print(data['data'])
            pyautogui.keyDown(data['data'])
        if data['type'] == 'keyUp':
            print(data['data'])
            pyautogui.keyUp(data['data'])
        
        # if data['type'] == 'input':
        #     terminal.write(data['data'])
        # if data['type'] == 'resize':
        #     terminal.resize(data['data']['rows'], data['data']['cols'])
    # await read_task
    await stream_task
async def main():
    async with serve(handle, "0.0.0.0", 5000) as server:
        print('server started')
        await server.serve_forever()

asyncio.run(main())
