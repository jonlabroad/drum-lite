import asyncio
import websockets
from light.control.neopixel_driver import NeopixelDriver

driver = NeopixelDriver()

async def echo(websocket, path):
    async for message in websocket:
        driver.drive(message)

asyncio.get_event_loop().run_until_complete(
    websockets.serve(echo, '10.0.0.27', 3000))
asyncio.get_event_loop().run_forever()