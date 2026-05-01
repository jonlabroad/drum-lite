using System;
using System.Collections.Generic;

namespace BlinkStickDotNetTest
{
  class Program
  {
    static void Main(string[] args)
    {
      var runner = new Runner();
      runner.Run().Wait();
    }
  }
}
