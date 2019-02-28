import { OnInit, Component } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { MapService } from 'src/app/shared/services/map/map.service';
import { HistoryService } from '../../history.service';
import { Map } from 'src/app/shared/services/map/map.model';
import {
  RouteListModel,
  RouteModel
} from 'src/app/manage/plan/models/route.model';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Result } from 'src/app/shared/models/response/result.model';
import { TaskModel, TaskState } from '../../../plan/models/task.model';
import { StaffInfoFormComponent } from '../../../base/staff-info/staff-info-form/staff-info-form.component';

import { NzDrawerService } from 'ng-zorro-antd';

@Component({
  selector: 'app-history-scheme-route-detail',
  templateUrl: './scheme-route-detail.component.html',
  styleUrls: ['./scheme-route-detail.component.scss']
})
export class SchemeRouteDetailComponent implements OnInit {
  percent = 0;
  isPlay = false;
  dragged = false;
  visible = false;
  taskListCache: TaskModel[];
  planId: number;
  interval$;

  constructor(
    private mapService: MapService,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initMap();
    this.planId = +this.route.snapshot.paramMap.get('id');
  }

  onBack() {
    const url = `/manage/history/scheme/${this.planId}/routes`;
    this.router.navigate([url]);
  }

  initMap() {
    const subject = new Subject();
    const subscription = this.mapService
      .initMap()
      .subscribe((hasLoaded: boolean) => {
        if (hasLoaded) {
          this.mapService.createMap(new Map('map', [113.18691, 23.031716], 15));
          if (subscription) {
            subscription.unsubscribe(); // 取消定时器
            subject.next(true);
          }
        }
      });
    return subject;
  }

  onTest() {
    if (this.isPlay) {
      this.interval$.unsubscribe();
    } else {
      this.interval$ = interval(1000).subscribe(() => (this.percent += 1));
    }
    this.isPlay = !this.isPlay;
  }

  onCollapseTask(data: TaskModel, e: boolean) {
    this.taskListCache.forEach((d: TaskModel) => {
      if (d.id === data.id) {
        d.expand = e;
        return;
      }
    });
  }

  onStopPro($event: Event): void {
    $event.stopPropagation();
  }

  convertTaskStateToColor(state: string): string {
    let color: string;
    switch (state) {
      case TaskState.ToDo:
        color = '#79cf6b'; // green
        break;
      case TaskState.Going:
      case TaskState.Collecting:
        color = '#42b4fc'; // blue
        break;
      case TaskState.Delay:
        color = '#fdc034'; // yellow
        break;
      case TaskState.Skipped:
        color = '#ce4544'; // red
        break;
      case TaskState.Completed:
        color = '#9d9d9d'; // gray
        break;
    }
    return color;
  }

  onSideDrag(target) {
    this.dragged = !this.dragged;
    this.visible = true;
    if (this.dragged && !this.taskListCache) {
      this.getTaskList(this.planId).subscribe((res: Result<TaskModel[]>) => {
        if (res.data) {
          this.taskListCache = res.data;
        }
      });
    }
  }

  onClose() {
    this.visible = false;
    this.dragged = !this.dragged;
  }

  getTaskList(id: number): Observable<Result<TaskModel[]>> {
    return this.historyService.getTaskList(id);
  }
}
