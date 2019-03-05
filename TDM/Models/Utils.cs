using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TDM.Models.Utils
{
    public class Converting
    {
      static  string[] months = new string[] {"มค","กพ","มีค","เมษ","พฤ", "มิย", "กค", "สค", "กย", "ตค", "พย", "ธค" };
        public static decimal ToDecimal(string data)
        {
            decimal result = 0;
            try {
                result = Convert.ToDecimal(data);
            }
            catch (Exception ex)
            { }
            finally { }
            return result;
        }


        public static int ToInt(string data)
        {
            int result = 0;
            try
            {
                result = Convert.ToInt32(data);
            }
            catch (Exception ex)
            { }
            finally { }
            return result;
        }



        public static string ToMonthShortName(int index)
        {
            string shortMonth = months[index - 1];

            return shortMonth;

                }

        public static string ToMonthShortName(string index)
        {
            string shortMonth = months[Convert.ToInt32(index) - 1];

            return shortMonth;

        }
    }
}