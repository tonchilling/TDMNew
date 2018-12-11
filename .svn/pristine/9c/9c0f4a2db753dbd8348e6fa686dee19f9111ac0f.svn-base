using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace TDM.Controllers.api
{
    public class GISController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Encrypt(GISParams prms)
        {
            try
            {
                EncryptionHelper e = new EncryptionHelper();
                return Json(e.Encrypt(prms.text));
            }
            catch (Exception ex) {
                return Json(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult Decrypt(GISParams prms)
        {
            try
            {
                EncryptionHelper e = new EncryptionHelper();
                return Json(e.Decrypt(prms.text));
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

    }

    public class GISParams
    {
        public string text { get; set; }
    }
}
