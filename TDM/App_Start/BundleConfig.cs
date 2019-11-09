using System.Web;
using System.Web.Optimization;

namespace TDM
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));


            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      //"~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"
                      ));

           /* bundles.Add(new StyleBundle("~/Content/css").Include(
                   "~/assets/fonts/font-awesome.css",
                  "~/assets/bootstrap/css/bootstrap.css",
                  "~/assets/css/bootstrap-select.min.css",
                  "~/assets/css/owl.carousel.css",
                  "~/assets/css/jquery.nouislider.min.css",
                  "~/assets/css/leaflet.css",
                  "~/assets/css/jquery.mCustomScrollbar.css",
                  "~/assets/css/colors/green.css",
                  "~/assets/css/user.style.css",
                  "~/assets/css/custom.css",
                  "~/Content/site.css",
                  "~/assets/css/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                  "~/assets/css/multi-select.css"
                  ));*/


            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //           "~/assets/fonts/font-awesome.css",
            //          "~/assets/bootstrap/css/bootstrap.css",
            //          "~/assets/css/bootstrap-select.min.css",
            //          "~/assets/css/owl.carousel.css",
            //          "~/assets/css/jquery.nouislider.min.css",
            //          "~/assets/css/leaflet.css",
            //          "~/assets/css/jquery.mCustomScrollbar.css",
            //          "~/assets/css/colors/green.css",
            //          "~/assets/css/user.style.css",
            //          "~/assets/css/custom.css",
            //          "~/Content/site.css",
            //          "~/assets/css/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
            //          "~/assets/css/multi-select.css"
            //          ));
        }
    }
}
