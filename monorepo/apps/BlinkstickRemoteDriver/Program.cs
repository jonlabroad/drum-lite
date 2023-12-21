using System;
using System.Collections.Generic;
using BlinkStickDotNet;
using Newtonsoft.Json;
using Fleck;

namespace BlinkStickDotNetTest
{
  class Program
  {
    private static int numLeds = 32;
    private static BlinkStick blinkStick;

    static void Main(string[] args)
    {
      blinkStick = BlinkStick.FindFirst();

      if (blinkStick == null)
      {
        Console.WriteLine("Could not find a blinkstick");
        return;
      }

      var isOpen = blinkStick.OpenDevice();
      Console.WriteLine($"isOpen: {isOpen}");

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
          HandleMessage(message);
        };
      });

      Console.ReadLine(); // Keep the console application running
      server.Dispose(); // Dispose the server when done
    }

    static void HandleMessage(string message)
    {
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
  }
}
