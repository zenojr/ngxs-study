import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DesignutilityService } from "../designutility.service";
import { tap } from 'rxjs/operators';
import { AddUsers, DeleteUsers, GetUsers, UpdateUsers } from "../actions/app.actions";

export class UserStateModel {
    users: any
}

@State<UserStateModel>({
    name: 'appstate',
    defaults: {
        users: []
    }
})

@Injectable()
export class AppState {
    constructor(private _du: DesignutilityService) {}

    @Selector()
    static selecStateData(state: UserStateModel){
        return state.users;
    }

    @Action(GetUsers)
    getDataFromState(ctx: StateContext<UserStateModel>) {
        return this._du.fetchUsers().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                users: returnData //data from api assigned to user inside the state
            })
        }))
    }

    @Action(AddUsers)
    addDataToSate( ctx: StateContext<UserStateModel>, { payload }: AddUsers) {
        return this._du.addUsers(payload).pipe(tap(returnData => {
            const state = ctx.getState();
            ctx.patchState({
                users: [
                    ...state.users, returnData
                ]
            })
        }))
    }

    @Action(UpdateUsers)
    updateDataOfState( ctx: StateContext<UserStateModel>, { payload, id, i }: UpdateUsers ){
        return this._du.updateUser(payload, i).pipe(tap(returnData => {
            const state = ctx.getState();

            const userList = [ ...state.users ];
            userList[i]=payload;

            ctx.setState({
                ...state,
                users: userList,
            })
        }))
    }

    @Action(DeleteUsers)
    deleteDataFromState( ctx: StateContext<UserStateModel>, { id }: DeleteUsers) {
        return this._du.deleteUser(id).pipe(tap( returnData => {
            const state = ctx.getState();
            console.log("ID", id)
            //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
            const filteredArray = state.users.filter((contents: { id: number; }) => contents.id!==id);

            ctx.setState({
                ...state,
                users:filteredArray
            })

        }))
    }
    

}