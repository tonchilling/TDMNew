using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TDM.Models.ViewModels;
using TDM.Repositories;
using TDM.Models;
namespace TDM.Controllers.api
{
    public class ChartMgrController : ApiController
    {

        [HttpPost]
        public IHttpActionResult SaveTempate(ChartTemplate_ViewModel dto)
        {
            var repos = new DBRepository();
          bool result=  repos.AddTemplate(dto);

            return Json(result);
        }


        [HttpGet]
        public IHttpActionResult GetDropDownList(string Code)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();



            var estimateData = repos.GetDropDownList(Code);

            return Json(estimateData);
        }


        [HttpGet]
        public IHttpActionResult GetGraphList(string TemplateID)
        {
            var repos = new DBRepository();
            SetionType sectionT = new SetionType();



            var graphData = repos.GetGraphList(TemplateID);

            return Json(graphData);
        }

        [HttpGet]
        public IHttpActionResult LoadAllList()
        {
            var repos = new DBRepository();
            SetionType sectionT = new SetionType();



            var graphData = repos.LoadAllList("");

            return Json(graphData);
        }


        

    }
}
