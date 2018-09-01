import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '../../http-api';

@Component({
    selector: 'page-groups',
    templateUrl: 'groups.html'
})
export class GroupsPage {

	categories:any;
	groups:any;
	group:any;

	namesOfSelectedCategories:string = "";

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
		this.categories = this.navParams.get('selectedCategories');
		this.categories.forEach(element => {
			this.namesOfSelectedCategories += element.name + ", ";
		});
		this.namesOfSelectedCategories = this.namesOfSelectedCategories.slice(0, -2);
		this.loadGroups();
	}

	public loadGroups()
	{
		this.groups = [];
		var categoriesIds = "";
		this.categories.forEach(element => {
			categoriesIds += element.id + ",";
		});
		categoriesIds = categoriesIds.slice(0, -1);
		this.http.get('/find/groups', '&photo-host=public&location=Johannesburg&category=' + categoriesIds).subscribe
		(
			(data) =>
			{				
				var jsonResp = JSON.parse(data.text());
				this.groups = jsonResp;
			},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
	}

}
