import { HttpErrorResponse, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url/url.service';
import { Observable, observable } from 'rxjs';
import { WebStorageService } from 'lendingcoreapp/web-storage/web-storage.service';
import { StorageScope } from 'lendingcoreapp/web-storage/storage-scope.enum';


@Injectable({
  providedIn: 'root'
})

export class SellerGuideService {

  announceFilter: any = { 'year': 'Year', 'month': 'Month', 'channel': 'channel' };
  filterApplied = false;

  constructor(private httpClient: HttpClient, private url: UrlService, private storage: WebStorageService) { }

  getSellerBanner(bannerFor): Observable<any> {
    return this.httpClient.get<any>(this.url.getDownloadCenterBaseUrl() + '/json/' + bannerFor + '.json');
  }

  getSellerLanding(): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl() +
      '/home', { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }

  private AccessToken() {
    const jsonString = this.storage.findById(StorageScope.Session, 'AccessTokenData');
    if (jsonString) {
      const obj = JSON.parse(jsonString);
      return obj.access_token;
    }
    return '';
  }

  getAnnouncementsLanding(): Observable<any> {
    return this.httpClient.get<any>(this.url.getaemBaseUrl() + '/announcement', {
      headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'json'
    });
  }

  getAnnouncementsOnfilter(year, month, channel): Observable<any> {
    let params = new HttpParams();
    this.filterApplied = true;
    this.announceFilter.year = year;
    this.announceFilter.month = month;
    if (year !== 'Year') {
      params = params.append('year', year);
    }

    if (month !== 'Month') {
      params = params.append('month', month);
    }
    if (channel !== '') {
      params = params.append('channel', channel);
      this.announceFilter.channel = channel;
    }
    return this.httpClient.get<any>(this.url.getaemBaseUrl()
      + '/announcement', { params: params, headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'json' });
  }

  getAnnouncementsDetailed(announceName): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl()
      + '/announcement/detail?type=html&name='
      + announceName, { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }

  getDropdownValues(): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl()
      + '/account', { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'json' });
  }

  getProcedureLanding(): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl()
      + '/procedures', { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }

  getProcedureFilter(subChannel): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl()
      + '/procedures?subchannel=' + subChannel, { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }

  getProductsLanding(): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl()
      + '/products', { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }

  getProductsDetailed(productName): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl()
      + '/products/' + productName, { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }

  getSubProductsDetailed(subProduct, productName): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl()
      + '/products/' + subProduct + '/' + productName, { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }

  getUnderWritingLanding(): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl()
      + '/guidelines', { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }

  getFormsLanding(): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl()
      + '/forms', { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }

  getUserGuideLanding(): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl()
      + '/userguide', { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }


  getResourcesLanding(): Observable<any> {
    return this.httpClient.get(this.url.getaemBaseUrl() +
      '/resources', { headers: new HttpHeaders({ 'token': this.AccessToken() }), responseType: 'text' });
  }
  
  getResourcesDetailed(resourceName): Observable<any> {	
    return this.httpClient.get(this.url.getaemBaseUrl()+'/resources/'+resourceName,{headers: new HttpHeaders({'token': this.AccessToken()}), responseType: 'text'});	
  }

}
