using AutoMapper;
using Microsoft.SqlServer.Types;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TDM.Models;
using TDM.Repositories;
namespace TDM.Controllers.api
{
    [RoutePrefix("api/Address")]
    public class AddressController : ApiController
    {
        private JsonSerializerSettings jsonSetting = JsonHelper.createJsonSetting();
        private TDManagementEntities tdmEntities = null;
        private TDASSETEntities tdaEntities = null;
        private commonEntities cmEntities = null;

        protected AddressController()
        {
            tdmEntities = new TDManagementEntities();
            tdaEntities = new TDASSETEntities();
            cmEntities = new commonEntities();
            tdmEntities.Configuration.ProxyCreationEnabled = false;
            tdaEntities.Configuration.ProxyCreationEnabled = false;
            cmEntities.Configuration.ProxyCreationEnabled = false;
        }



        [HttpPost]
        public IHttpActionResult GetCluster()
        {
            var repos = new TDAssetRespository();


            /* switch (SectionType)
             {
                 case "1":sectionT = SetionType.Region;break;
                 case "2": sectionT = SetionType.Provice; break;
                 case "3": sectionT = SetionType.Amphur; break;
             }*/



            var results = repos.GetCluster();

            return Json(results);
        }


        [HttpGet]
        [Route("GetProvinceShapeBy")]
        public IHttpActionResult GetProvinceShapeBy(string code)
        {
            try
            {
               
                return Json(tdaEntities.PROVINCEs.Where(x=>x.PRO_C.Equals(code)).ToList().Select(x=>new SHAPE_ViewModel(x.Shape)).FirstOrDefault(), jsonSetting);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetAmphoeShapeBy(string code)
        {
            try
            {
                return Json(tdaEntities.AMPHOEs.Where(x => x.DIS_C.Equals(code)).ToList().Select(x => new SHAPE_ViewModel(x.Shape)).FirstOrDefault(), jsonSetting);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetTambolShapeBy(string code)
        {
            try
            {
                var result = tdaEntities.TAMBOLs.Where(x => x.SUB_C.Equals(code)).ToList();
                return Json(result.Select(x => new SHAPE_ViewModel(x.Shape)).FirstOrDefault(), jsonSetting);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public IHttpActionResult GetProvinces()
        {
            return Json(tdaEntities.PROVINCEs.Where(p => p.PRO_C !="").OrderBy(o => o.NAME_T));
        }

        public IHttpActionResult GetStateById(int ID)
        {
            return Json(cmEntities.TB_MAS_AMPHUR.Where(p => p.PROVINCE_SEQ == ID).OrderBy(o => o.AMPHUR_NAME_TH));
        }

        public IHttpActionResult GetTambolById(int ID)
        {
            return Json(cmEntities.TB_MAS_TAMBOL.Where(p => p.AMPHUR_SEQ == ID).OrderBy(o => o.TAMBOL_NAME_TH));
        }

        public IHttpActionResult GetBranchById(int PRO_C, int DIS_C=0)
        {
            try
            {
                return Json(cmEntities.TB_MAS_LANDOFFICE.Where(p => p.PROVINCE_SEQ == PRO_C && (DIS_C == 0 || p.AMPHUR_SEQ == DIS_C)).OrderBy(o => o.LANDOFFICE_NAME_TH));
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
    }

}
