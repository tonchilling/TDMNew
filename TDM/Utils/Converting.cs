using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TDM.Utils
{
    public class Converting
    {

        public static string[] month = {"มค.", "กพ.", "มีค.", "มย.", "พฤ.", "มิย.", "กค.", "สค.", "กย.", "ตค.", "พย.", "ธค." };
        public static decimal ToDecimal(object val)
        {
            decimal result = 0;
            try {
                result = Convert.ToDecimal(val);
            }
            catch { }
            finally { }

            return result;
        }

        public static int ToInt(object val)
        {
            int result = 0;
            try
            {
                result = Convert.ToInt32(val);
            }
            catch { }
            finally { }

            return result;
        }

        public static string ToMonthShortName(object val)
        {
            string result = "";
            try
            {
                result = month[Convert.ToInt32(val)-1];
            }
            catch { }
            finally { }

            return result;
        }
    }
}