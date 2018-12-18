import { Component, OnInit } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';

import { ApkRes } from './models/apk-res.model';
import { ApkService } from './apk.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { Result } from '../../../shared/models/response/result.model';
import { environment } from '../../../../environments/environment';
import {ApkServiceV2} from './apk.service-v2';

@Component({
    selector   : 'app-apk',
    templateUrl: './apk.component.html',
    styleUrls  : [ './apk.component.scss' ]
})
export class ApkComponent implements OnInit {
    breadcrumbs = [
        {
            link : '/',
            title: '首页',
        },
        {
            link : '',
            title: '系统设置',
        },
        {
            link : '/manage/system/apkManagement',
            title: '应用更新',
        },
    ];
    isTableSpinning = false;
    isFormVisible = false;
    isFormSpinning = false;

    resCache: ApkRes[];
    formCache = {
        version    : '',
        description: '',
    };
    fileList: UploadFile[] = [];

    env = environment;

    constructor(private apkService: ApkServiceV2,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.getListByPage();
    }

    onOpenForm(): void {
        this.isFormVisible = true;
    }

    onCloseForm(): void {
        this.isFormVisible = false;
    }

    onBeforeUpload = (file: UploadFile): boolean => {
        this.fileList.push(file);
        return false;
    };

    /**
     * 下载apk
     * @param url
     */
    onDownload(url: string) {
        console.log(url);
        window.open(url, '_blank');
    }


    // TODO
    onSubmit() {
        if (!this.formCache.version || !this.formCache.description || !this.fileList) {
            this.notificationService.create({
                type   : 'warning',
                title  : '',
                content: '请输入完整信息: 版本号, 描述和文件',
            });
            return;
        }
        this.isFormSpinning = true;
        const formData = new FormData();
        this.fileList.forEach((file: any) => formData.append('apk', file));

        const url = `${this.env.api}/apps?description=${this.formCache.description}&version=${this.formCache.version}`;
        //this.asyncPost(formData, url);
        this.apkService.addApk(formData, {
            version    : this.formCache.version,
            description: this.formCache.description
        }).subscribe(
            res => {
                console.log(res);
                this.isFormSpinning = false;
                this.notificationService.create({
                    type   : 'success',
                    title  : '恭喜,上传成功',
                    content: '该提醒将自动消失',
                });
                this.getListByPage();
                this.onCloseForm();
            },
            err => {
                this.notificationService.create({
                    type   : 'error',
                    title  : '抱歉,上传失败',
                    content: err ? err.error.message : '',
                });
                this.isFormSpinning = false;
            }
        );
    }

    // TODO 由于 rebirth-http 的库在上传apk时出现bug导致上传失败,当前先使用原生的 ng 的 httpClient
    asyncPost(formData, url) {
        /*this.apkService.addApk(formData, url).subscribe(
         res => {
         console.log(res);
         this.isFormSpinning = false;
         this.notificationService.create({
         type   : 'success',
         title  : '恭喜,上传成功',
         content: '该提醒将自动消失',
         });
         this.getListByPage();
         this.onCloseForm();
         },
         err => {
         this.notificationService.create({
         type   : 'error',
         title  : '抱歉,上传失败',
         content: `${err.message}`,
         });
         this.isFormSpinning = false;
         }
         );*/
    }


    // TODO 由于 rebirth-http 的库在上传apk时出现bug导致上传失败,当前先使用原生的 ng 的 httpClient
    getListByPage() {
        this.isTableSpinning = true;
        const url = `${this.env.api}/apps/latest`;
        this.apkService.getApkList(url).subscribe(
            (res: Result<ApkRes>) => {
                this.resCache = res.data ? [ res.data ] : [];
                this.resCache.forEach(item => {
                    item.uploadTime = new Date(item.uploadTime);
                });
                this.isTableSpinning = false;
            },
            err => this.isTableSpinning = false
        );
    }

}
