using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TDM.Models;

namespace TDM.Controllers.api
{
    public class DevController : ApiController
    {
        [HttpPost]
        public IHttpActionResult sql(DevParam prms)
        {
            try
            {
                TDASSETEntities db = new TDASSETEntities();
                List<string> result = db.Database.SqlQuery<string>(prms.query).ToList();
                return Json(result);
            }
            catch (Exception ex) {
                return Json(ex);
            }
        }


    }

    public class DevParam
    {
        public string query { get; set; }
    }
}
