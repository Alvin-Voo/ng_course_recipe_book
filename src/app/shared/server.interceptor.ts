import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducers';

@Injectable()
export class ServerInterceptor implements HttpInterceptor{
  constructor(private store: Store<fromApp.AppState>){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted! ',req);
    //switchMap is used to return the 'latest' observable
    //since store.select('auth') itself will return an Observable of type State by default
    //And next handle will eventually return the correct Observable of type HttpEvent
    //So we want the final returned observable to be from next handle

    //store.select(auth) will always fire whenever there's a change of State, i.e. in this case token or authenticated change defined in it
    //hence take(1) is to limit the emiision to one

    //in this case... take(1).switchMap is limiting the emission to one, which is the latest emission
    //hence, if there's no next handle emission, then there's no observable returned

    //in this case its useful for logout case, when the state of token and authenticated are changed,
    //BUT there's no HttpRequest of any sort, so next handle wont be fired
    return this.store.select('auth').take(1).switchMap((authState: fromApp.AppState['auth']) =>{
        // console.log("token fetched is "+ authState.token)
        const clonedReq = req.clone({params: req.params.set('auth', authState.token)});
        return next.handle(clonedReq);
    })


  }

}
