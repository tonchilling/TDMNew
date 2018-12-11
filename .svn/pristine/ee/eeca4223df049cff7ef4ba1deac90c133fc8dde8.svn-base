using System.Collections.Generic;
using System.Web.Mvc;
using TDM.Models.DashboardModel;

namespace TDM.Controllers
{
    public class DashboardController : Controller
    {

        // GET: Dashboard
        public ActionResult Index()
        {
            IList<FeedNew_Model> newsList = new List<FeedNew_Model>();
            IList<FeedNew_Model> general_im_interest = new List<FeedNew_Model>();
            int[] pieLandData,pieCondoData,pieBuilderData, PieProvinceBuild;

            pieLandData = new int[] { 25,10,65 };
            pieCondoData = new int[] { 145, 55 };
            pieBuilderData = new int[] { 29 , 3};

            PieProvinceBuild = new int[] { 12 , 28 , 30, 30  };
            newsList.Add(new FeedNew_Model(@"เมื่อวันพุธที่ 7 มีนาคม 2561 นางนงลักษณ์ ขวัญแก้ว รองอธิบดีกรมธนารักษ์ เป็นประธานการประชุม 
                                    การพิจารณาแนวทางการใช้ประโยชน์จากข้อมูลขนาดใหญ่(Big Data) ณ ห้องประชุม 302 กรมธนารักษ์",
                                    "Fri, 9Mar 2018","admin",
                                    "https://61.19.211.186/elearning-treasury/mod/forum/discuss.php?d=1"));
            newsList.Add(new FeedNew_Model(@"2",
                                    "Fri, 9Mar 2018", "admin",
                                    "https://61.19.211.186/elearning-treasury/mod/forum/discuss.php?d=1"));
            newsList.Add(new FeedNew_Model(@"3",
                                    "Fri, 9Mar 2018", "admin",
                                    "https://61.19.211.186/elearning-treasury/mod/forum/discuss.php?d=1"));
            newsList.Add(new FeedNew_Model(@"4",
                                    "Fri, 9Mar 2018", "admin",
                                    "https://61.19.211.186/elearning-treasury/mod/forum/discuss.php?d=1"));
            newsList.Add(new FeedNew_Model(@"5",
                                    "Fri, 9Mar 2018", "admin",
                                    "https://61.19.211.186/elearning-treasury/mod/forum/discuss.php?d=1"));


            ViewData["news"] = newsList; //ข่าวสารและกิจกรรมที่สำคัญ
            ViewData["gen_im_in"] = general_im_interest; //เนื้อหาวิชาการทั่วไป ที่สำคัญและน่าสนใจ
            ViewData["PieLandData"] = pieLandData;
            ViewData["PieCondoData"] = pieCondoData;
            ViewData["pieBuilderData"] = pieBuilderData;
            ViewData["PieProvinceBuild"] = PieProvinceBuild;
            return View();
        }
    }
}