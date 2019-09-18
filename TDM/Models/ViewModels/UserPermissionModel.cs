using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TDM.Models.ViewModels
{

    public class UserProFile
    {
        public string id { get; set; }
        public string  USER_ID { get; set; }


        public string  USER_NAME { get; set; }


        public string USER_SURNAME { get; set; }


        public string Email { get; set; }


        public string remember_token { get; set; }
        public List<UserPermissionMenuModel> menuList { get; set; }
    }
    public class UserPermissionMenuModel
    {
       public string id {get;set;}
        public string user_id { get; set; }
        public string menuId { get; set; }
        public string titleTh { get; set; }
        public string parentMenu { get; set; }

        public List<UserPermissionMenuModel> subMenuList { get; set; }
    }


  



}