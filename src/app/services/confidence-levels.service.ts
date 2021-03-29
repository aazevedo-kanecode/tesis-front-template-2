import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class ConfidenceLevelsService {
  public url: string;
  public token;

  public headersAuthorization = new HttpHeaders()
    .set("content-type", "application/json")
    .set("Authorization", this.getToken())
    .set("Access-Control-Allow-Origin", "*");

  constructor(protected _http: HttpClient) {
    this.url = environment.url;
  }

  //Agregar Face
  addConfidenceLevels(confidenceLevels): Observable<any> {
    let json = JSON.stringify(confidenceLevels);
    let params = json;

    return this._http.post(environment.url + "confidence-level", params, {
      headers: this.headersAuthorization,
    });
  }

  //Editar Face
  editConfidenceLevels(confidenceLevels): Observable<any> {
    let json = JSON.stringify(confidenceLevels);
    let params = json;

    return this._http.put(
      environment.url + "update-confidence-level/" + confidenceLevels._id,
      params,
      {
        headers: this.headersAuthorization,
      }
    );
  }

  //Obtener Nivel de confianza
  public getConfidenceLevels(): Observable<any> {
    return this._http.get(environment.url + "confidence-levels", {
      headers: this.headersAuthorization,
    });
  }

  //Obtener Token
  getToken() {
    let token = JSON.parse(localStorage.getItem("token"));

    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
