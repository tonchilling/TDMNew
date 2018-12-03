// Encryption String: F7EBC908B106D4282FA705D0EED915DBE002774B1A152DCC Key: ABC12345
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;


public class JsonHelper
{
    public static JsonSerializerSettings createJsonSetting()
    {
        return new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Serialize
        };
    }
}
