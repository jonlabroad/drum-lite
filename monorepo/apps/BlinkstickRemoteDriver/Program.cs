using BlinkStickDotNet;
using Quobject.SocketIoClientDotNet.Client;

namespace BlinkStickDotNetTest
{
  class Program
  {
    static void Main(string[] args)
    {
      var socket = IO.Socket("0.0.0.0:5001");

      socket.On(Socket.EVENT_CONNECT, () =>
      {
        Console.WriteLine("Connected to Socket.IO server");

        // Emitting the command_leds message when connected
        socket.Emit("command_leds", "Your_LED_Command");
      });

      socket.On(Socket.EVENT_DISCONNECT, () =>
      {
        Console.WriteLine("Disconnected from Socket.IO server");

        // Reconnect automatically
        socket.Connect();
      });

      socket.On("command_leds", (data) =>
      {
        Console.WriteLine($"Received command_leds: {data}");

        // Write an entire frame
        Console.WriteLine(data);

      });

      // To handle errors
      socket.On(Socket.EVENT_ERROR, (error) =>
      {
        Console.WriteLine($"Socket.IO Error: {error}");
      });

      Console.ReadLine(); // Keep the console application running

      try
      {
        var blinkStick = BlinkStick.FindFirst();

        if (blinkStick == null )
        {
          Console.WriteLine("Could not find a blinkstick");
        }

        var isOpen = blinkStick.OpenDevice();
        Console.WriteLine($"isOpen: {isOpen}");

        var numLeds = 32;
        byte colorVal = 5;
        var ledNum = 0;
        var numIter = 0;
        while (true)
        {
          byte[] rgbArray = new byte[numLeds * 3];
          for (int i = 0; i < numLeds; i++)
          {
            var startIndex = i * 3;
            rgbArray[startIndex] = i == ledNum ? colorVal : (byte)0;
            rgbArray[startIndex + 1] = i == ledNum ? colorVal : (byte)20;
            rgbArray[startIndex + 2] = i == ledNum ? colorVal : (byte)0;
          }

          if (blinkStick != null)
          {
            blinkStick.SetColors(0, rgbArray);
            Thread.Sleep(20);
            colorVal += 1 % 128;
            if (numIter % 25 == 0)
            {
              ledNum = (ledNum + 1) % numLeds;
            }
          }
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex);
      }
      Console.WriteLine("OK");
    }
  }
}
