import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '../../http-api';
import { GroupsPage} from '../groups/groups'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

    categories:any;
    category:any;

    showLoading:boolean = true;
    selectedCategories:any;
    itemsAreSelected:boolean = false;
    selectedCategoriesNames:string = "";

    constructor(public navCtrl: NavController,  public http: Http) {
        this.loadGroups();
        this.selectedCategories = [];
    }

    public loadGroups()
    {
        this.categories = [];
        this.category = {};      

        this.http.get('/2/categories').subscribe
        (
            (data) =>
            {
                this.showLoading = false;
                var jsonResp = JSON.parse(data.text());
                this.categories = jsonResp.results;
            },
            (error) =>
            {
                alert("Error: " + error);
            }
        );
    }

    public addToSelected(category)
    {
        if (this.selectedCategories.includes(category))
        {
            this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1);
            if (this.selectedCategories.length == 0)
                this.itemsAreSelected = false;
        }
        else
        {
            this.selectedCategories.push(category);
            this.itemsAreSelected = true;
        }

        this.selectedCategoriesNames = "";
        this.selectedCategories.forEach(element => {
            this.selectedCategoriesNames += element.name + ", ";
        });
        this.selectedCategoriesNames = this.selectedCategoriesNames.slice(0, -2);
    }

    public findGroups()
    {
        this.navCtrl.push(GroupsPage, {'selectedCategories': this.selectedCategories});
    }
}
