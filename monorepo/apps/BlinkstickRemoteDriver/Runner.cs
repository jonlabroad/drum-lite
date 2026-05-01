using System;
using System.Collections.Generic;
using BlinkStickDotNet;
using Newtonsoft.Json;
using Fleck;
using System.Runtime.CompilerServices;

namespace BlinkStickDotNetTest
{
  public class Runner
  {
    private static int numLeds = 32;
    private BlinkStick blinkStick;
    private long lastSendTime = 0;

    public async Task Run()
    {
      ConnectBlinkstick();
      Init();

      var allSockets = new List<IWebSocketConnection>();
      var server = new WebSocketServer("ws://0.0.0.0:5001");
      server.Start(socket =>
      {
        socket.OnOpen = () =>
        {
          Console.WriteLine($"Client connected: {socket.ConnectionInfo.ClientIpAddress}:{socket.ConnectionInfo.ClientPort}");
          allSockets.Add(socket);
        };

        socket.OnClose = () =>
        {
          Console.WriteLine($"Client disconnected: {socket.ConnectionInfo.ClientIpAddress}:{socket.ConnectionInfo.ClientPort}");
          allSockets.Remove(socket);
        };

        socket.OnMessage = message =>
        {
          try
          {
            HandleMessage(message);
          }
          catch (Exception e)
          {
            Console.WriteLine(e.ToString());
            // TODO try to reconnect blinkstick
          }
        };
      });

      while (true)
      {
        await Task.Delay(2000);
        // This check doesn't actually work on the pi :(
        if (!BlinkstickIsConnected())
        {
          ConnectBlinkstick();
        }
      }
      Console.WriteLine("Exiting...");
      server.Dispose(); // Dispose the server when done
    }

    private void ConnectBlinkstick()
    {
      Console.WriteLine("Connecting Blinksticks...");
      try
      {
        blinkStick = BlinkStick.FindFirst();

        if (blinkStick == null)
        {
          Console.WriteLine("Could not find a blinkstick");
          return;
        }

        var isOpen = blinkStick.OpenDevice();
        blinkStick.SetMode(2);
        Console.WriteLine($"isOpen: {isOpen}");
      }
      catch (Exception e)
      {
        Console.WriteLine(e.Message);
      }
    }

    private void HandleMessage(string message)
    {
      try
      {
        var nowMillis = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds();
        var periodSinceLastMillis = nowMillis - lastSendTime;
        if (periodSinceLastMillis < 100)
        {
          return;
        }
        lastSendTime = nowMillis;
        dynamic parsedData = JsonConvert.DeserializeObject<dynamic>(message);

        byte[] rgbArray = new byte[numLeds * 3];
        foreach (var kvp in parsedData)
        {
          var ledNum = int.Parse(kvp.Name);
          if (ledNum > 31)
          {
            break;
          }
          var ledRgb = kvp.Value;
          var baseIndex = ledNum * 3;
          rgbArray[baseIndex] = ledRgb[1];
          rgbArray[baseIndex + 1] = ledRgb[0];
          rgbArray[baseIndex + 2] = ledRgb[2];
        }
        blinkStick.SetColors(0, rgbArray);
      }
      catch (Exception e)
      {
      }
    }

    private void Init()
    {
      var rgbArray = new byte[numLeds * 3];
      for (var ledNum = 0; ledNum < numLeds; ledNum++)
      {
          var ledRgb = new byte[3] { 128, 128, 128 };
          var baseIndex = ledNum * 3;
          rgbArray[baseIndex] = ledRgb[1];
          rgbArray[baseIndex + 1] = ledRgb[0];
          rgbArray[baseIndex + 2] = ledRgb[2];
      }
      blinkStick.SetColors(0, rgbArray);
    }

    bool BlinkstickIsConnected()
    {
      try
      {
        var ledCount = blinkStick.GetLedCount();
        return ledCount >= 0;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        return false;
      }
    }
  }
}
