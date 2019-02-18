/**
 * Created by wujiahui on 2019/1/18.
 */

import { RouteModel, RouteListModel } from '../../plan/models/route.model';
import { TaskModel } from '../../plan/models/task.model';

export class ModelConverter {

    public static routeResToListModel(r: RouteModel): RouteListModel {
        let l: RouteListModel;
        l = r;
        l.checked = false;
        return l;
    }

    public static taskResToListModel(t: TaskModel, routeId: number): TaskModel {
        return t = {
            ...t,
            routeId,
            checked: false,
            expand: false,
        };
    }
}
