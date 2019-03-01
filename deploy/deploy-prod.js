/**
 * Created by Blink on 1/3/2018 AD.
 */

var scp2 = require('scp2');
var zip = require('node-zip-dir');
var node_ssh = require('node-ssh');
var DeployUtils = require('./deploy-utils').DeployUtils;
var SSH_KEY_PATH = require('./ssh-key-config').SSH_KEY_PATH;

var remotes = {
    servers: [
        {
            host: '125.94.44.194',
            user: 'root',
            password: 'zhangzhou2019@prod!'
        },
    ],
    projectName: 'recycling-web-client',
    projectSpace: '/root/recycling/web-client/web-middleware',
    scriptPath: '/root/recycling/web-client/web-middleware/web-client',
    backupPath: '/root/recycling/web-client/web-middleware/backup',
};

class Deployer {
    constructor(server) {
        this.server = server;
        this.ssh = new node_ssh();
    }

    beforeSetting() {
        console.log('beforeSetting...');
        return new Promise((resolve, reject) => {
            this.ssh.execCommand('mkdir -p ' + remotes.backupPath).then((result) => {
                if (!result.stderr) {
                    console.log('nice, beforeSetting success');
                    resolve();
                } else {
                    console.log('oh my god, beforeSetting error' + JSON.stringify(result));
                }
            })
        })
    }

    // 压缩
    zipCompress() {
        return new Promise((resolve, reject) => {
            console.log('start zip...');
            zip.zip('dist/recycling-web-client', './deploy/' + remotes.projectName + '.zip').then(() => {
                console.log('nice, zip success');
                resolve();
            }).catch((err) => {
                console.log('oh my god, zip error', err);
                reject();
            })
        })
    }

    // 将本地文件上传到远程服务器
    copyToRemote() {
        return new Promise((resolve, reject) => {
            console.log('start copy...');
            scp2.scp('./deploy/' + remotes.projectName + '.zip', {
                host: this.server.host,
                username: this.server.user,
                password: this.server.password,
                path: remotes.projectSpace,
            }, (err) => {
                if (err) {
                    console.log('oh my god, copy error');
                    console.log(err);
                    reject();
                } else {
                    console.log('nice, copy success');
                    resolve();
                }
            })
        })
    }

    // 备份
    backup() {
        console.log('backup...');
        return new Promise((resolve, reject) => {
            var backupName = remotes.projectName + '-' + DeployUtils.dateFormat(new Date(), 'yyyy-MM-dd');
            this.ssh.execCommand('zip ' + remotes.backupPath + '/' + backupName + ' -r ./*', {cwd: remotes.scriptPath}).then((result) => {
                if (!result.stderr) {
                    console.log('nice, backup success');
                    resolve();
                } else {
                    console.log('oh my god, backup error ' + JSON.stringify(result));
                }
            })
        })
    }

    // 将最新的代码替换到服务器
    replace() {
        let _self = this;

        function removeOldScript() {
            return new Promise((resolve, reject) => {
                _self.ssh.execCommand('rm -r ' + remotes.scriptPath).then((result) => {
                    if (!result.stderr) {
                        resolve()
                    } else {
                        console.log('oh my god, removeOldScript error ' + JSON.stringify(result))
                    }
                })
            })
        }

        function createDir() {
            console.log('createDir...')
            return new Promise((resolve, reject) => {
                _self.ssh.execCommand('mkdir -p ' + remotes.scriptPath).then((result) => {
                    if (!result.stderr) {
                        resolve()
                    } else {
                        console.log('createDir: ' + JSON.stringify(result))
                    }
                })
            })
        }

        function move() {
            return new Promise((resolve, reject) => {
                var zipPath = remotes.projectSpace + '/' + remotes.projectName + '.zip';
                _self.ssh.execCommand('mv ' + zipPath + ' ' + remotes.scriptPath).then((result) => {
                    if (!result.stderr) {
                        resolve();
                    } else {
                        console.log('move: ' + JSON.stringify(result));
                    }
                })
            })
        }

        function unzipProject() {
            return new Promise((resolve, reject) => {
                var project = remotes.scriptPath + '/' + remotes.projectName + '.zip';
                _self.ssh.execCommand('unzip ' + project + ' -d ' + remotes.scriptPath).then((result) => {
                    if (!result.stderr) {
                        resolve();
                    } else {
                        console.log('unzipProject: ' + JSON.stringify(result));
                    }
                })
            })
        }

        return new Promise((resolve, reject) => {
            console.log('deploy...');
            resolve();
        })
            .then(res => removeOldScript())
            .then(res => createDir())
            .then(res => move())
            .then(res => unzipProject())
            .then(() => console.log('replace success'));
    }

    // 部署
    publish() {
        this.ssh.connect({
            host: this.server.host,
            username: this.server.user,
            password: this.server.password,
            // privateKey: SSH_KEY_PATH,
        }).then(() => {
            new Promise((resolve, reject) => {
                console.log('deploy...');
                resolve()
            }).then(res => this.beforeSetting())
                .then(res => this.zipCompress())
                .then(res => this.copyToRemote())
                .then(res => this.backup())
                .then(res => this.replace())
                .then(res => console.log('deploy success'))
                .catch(err => console.log(err));
        })
    }
}

function deploy() {
    remotes.servers.forEach(server => new Deployer(server).publish());
}

deploy();
