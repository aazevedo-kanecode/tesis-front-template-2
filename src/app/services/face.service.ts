import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class FaceService {
  public url: string;
  public identity;
  public token;

  public headersAuthorization = new HttpHeaders()
    .set("content-type", "application/json")
    .set("Authorization", this.getToken())
    .set("Access-Control-Allow-Origin", "*");

  constructor(protected _http: HttpClient) {
    this.url = environment.url;
  }

  //Agregar Face
  addFace(face): Observable<any> {
    let json = JSON.stringify(face);
    let params = json;

    return this._http.post(environment.url + "save-face", params, {
      headers: this.headersAuthorization,
    });
  }

  //Editar Face
  editFace(face): Observable<any> {
    let json = JSON.stringify(face);
    let params = json;

    return this._http.put(environment.url + "update-face/" + face._id, params, {
      headers: this.headersAuthorization,
    });
  }

  //Eliminar Face
  removeFace(faceId): Observable<any> {
    let json = JSON.stringify(faceId);

    return this._http.delete(environment.url + "face/" + faceId, {
      headers: this.headersAuthorization,
    });
  }

  //Obtener Face
  public getFaceByUser(idFace): Observable<any> {
    return this._http.get(environment.url + "face-by-user/" + idFace, {
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
