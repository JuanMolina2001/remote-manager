import asyncio
from websockets.asyncio.server import serve , ServerConnection
from terminal import Terminal
from screen import Screen
import json

async def handle(websocket: ServerConnection): 
    terminal = Terminal(websocket)
    screen = Screen(websocket)
    print('cmd started')
    # read_task = asyncio.create_task(terminal.read())
    stream_task = asyncio.create_task(screen.stream())
    async for message in websocket:
        data = json.loads(message)
        # if data['type'] == 'input':
        #     terminal.write(data['data'])
        # if data['type'] == 'resize':
        #     terminal.resize(data['data']['rows'], data['data']['cols'])
    # await read_task
    await stream_task
async def main():
    async with serve(handle, "localhost", 5000) as server:
        await server.serve_forever()

asyncio.run(main())
