using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TDM.Models.ViewModels;
using TDM.Repositories;
namespace TDM.Controllers.api
{

    public class DBMgrController : ApiController
    {
       

        [HttpPost]
        public IHttpActionResult GetDatabaseList([FromBody]DBViewModel dto)
        {
            var repos = new DBRepository();

            return Json(repos.GetDatabaseList(dto));
        }


        [HttpPost]
        public IHttpActionResult QueryData([FromBody]DBViewModel dto)
        {
            var repos = new DBRepository();

            return Json(repos.GetQueryToDatatable(dto));
        }
    }
}
