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
        IHttpActionResult msgResponse;


        [HttpPost]
        public IHttpActionResult GetDatabaseList([FromBody]DBViewModel dto)
        {
            var repos = new DBRepository();

            try {

                msgResponse = Json(repos.GetDatabaseList(dto));
            }
            catch (Exception ex)
            {
                msgResponse = InternalServerError(ex);
            }

            return msgResponse;


            
        }


        [HttpPost]
        public IHttpActionResult QueryData([FromBody]DBViewModel dto)
        {
            var repos = new DBRepository();
         

            try {

                msgResponse= Json(repos.GetQueryToDatatable(dto));
            }
            catch (Exception ex) {
                msgResponse = InternalServerError(ex);
            }
        
            return msgResponse;
        }
    }
}
