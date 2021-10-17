import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PositionClass, ZoneClassName, ZoneColumnType } from 'src/app/enums/zone.enum';

import { ZoneColumn, ZoneLine } from 'src/app/models/zone.model';
import { DomService } from 'src/app/services/dom.service';

@Component({
  selector: 'config-toast-zone',
  templateUrl: './config-toast-zone.component.html',
  styleUrls: ['./config-toast-zone.component.scss']
})
export class ConfigToastZoneComponent implements OnInit {

  @Output() updatePositionClass = new EventEmitter<PositionClass>();

  zoneLine: ZoneLine[] = [];
  zoneColumnTypeTop: ZoneColumnType[] = [];
  zoneColumnTypeBottom: ZoneColumnType[] = [];

  constructor(private _domService: DomService) { }

  ngOnInit(): void {
    this.initZoneButton();
  }

  initZoneButton(): void {
    this.zoneLine = [{
      className: ZoneClassName.top,
      zoneColumns: [{
          className: 'top-left',
          zoneColumnType: ZoneColumnType.topLeft,
          positionClass: PositionClass.topLeft,
        }, {
          className: 'top-middle',
          zoneColumnType: ZoneColumnType.topMiddle,
          positionClass: PositionClass.topMiddle,
        }, {
          className: 'top-right added',
          zoneColumnType: ZoneColumnType.topRight,
          positionClass: PositionClass.topRight
      }]
    }, {
      className: ZoneClassName.center,
      zoneColumns: [{
        className: 'center-left',
        zoneColumnType: ZoneColumnType.centerLeft,
        positionClass: PositionClass.centerLeft,
        available: false,
      }, {
        className: 'center-middle',
        zoneColumnType: ZoneColumnType.centerMiddle,
        positionClass: PositionClass.centerMiddle,
        available: false,
      }, {
        className: 'center-right',
        zoneColumnType: ZoneColumnType.centerRight,
        positionClass: PositionClass.centerRight,
        available: false
      }]
    }, {
      className: ZoneClassName.bottom,
      zoneColumns: [{
        className: 'bottom-left',
        zoneColumnType: ZoneColumnType.bottomLeft,
        positionClass: PositionClass.bottomLeft,
      }, {
        className: 'bottom-middle',
        zoneColumnType: ZoneColumnType.bottomMiddle,
        positionClass: PositionClass.bottomMiddle,
      }, {
        className: 'bottom-right',
        zoneColumnType: ZoneColumnType.bottomRight,
        positionClass: PositionClass.bottomRight
      }]
    }]

    this.zoneLine.forEach((line) => {
      line.active = true;
      line.zoneColumns.map(columnn => {
        columnn.available = columnn.available ?? true;
      });
    });

    this.zoneColumnTypeTop.push(ZoneColumnType.topRight);
  }

  addZone(zoneLine: ZoneLine, zoneColumn: ZoneColumn): void {
    let positionClassToEmit: PositionClass = zoneColumn.positionClass;
    let zoneColumnListAdded: ZoneColumnType[] = zoneLine.className === ZoneClassName.top ? this.zoneColumnTypeTop : this.zoneColumnTypeBottom;
    let zoneColumnListDeleted: ZoneColumnType[] = zoneLine.className === ZoneClassName.top ? this.zoneColumnTypeBottom : this.zoneColumnTypeTop

    zoneColumnListDeleted = [];
    this.removed(zoneLine.className);

    if (zoneColumnListAdded.find(columnType => columnType === zoneColumn.zoneColumnType)) {
      // zoneColumnListAdded = zoneColumnListAdded.filter(columnType => columnType !== zoneColumn.zoneColumnType);
      this._domService.removeClassToElementByClassName(zoneColumn.className.split(' ')[0], 'added');
      this._domService.removeClassToElementByClassName(zoneColumn.className.split(' ')[0], 'stripped');
    } else {
      zoneColumnListAdded.push(zoneColumn.zoneColumnType);
      this._domService.addClassToElementByClassName(zoneColumn.className.split(' ')[0], 'added');
    }

    let firstZoneColumn: ZoneColumn | null = null;
    let secondZoneColumn: ZoneColumn | null = null;
    let thirdZoneColumn: ZoneColumn | null = null;

    if (zoneColumnListAdded.length === 3) {
      thirdZoneColumn = zoneLine.zoneColumns.filter(zoneColumn => zoneColumn.zoneColumnType === zoneColumnListAdded[2])[0]
      this._domService.addClassToElementByClassName(thirdZoneColumn.className.split(' ')[0], 'stripped');
      if (zoneColumnListAdded.filter(zone => zone === ZoneColumnType.topLeft || zone === ZoneColumnType.topMiddle || zone === ZoneColumnType.topRight).length > 0) {
        positionClassToEmit = PositionClass.topFull;
      } else if (zoneColumnListAdded.filter(zone => zone === ZoneColumnType.bottomLeft || zone === ZoneColumnType.bottomMiddle || zone === ZoneColumnType.bottomRight).length > 0) {
        positionClassToEmit = PositionClass.bottomFull;
      }
    } else {
      firstZoneColumn = zoneLine.zoneColumns.filter(zoneColumn => zoneColumn.zoneColumnType === zoneColumnListAdded[0])[0];
      if (zoneColumnListAdded.length === 2) {
        secondZoneColumn = zoneLine.zoneColumns.filter(zoneColumn => zoneColumn.zoneColumnType === zoneColumnListAdded[1])[0];
        positionClassToEmit = firstZoneColumn.positionClass;
        this._domService.addClassToElementByClassName(firstZoneColumn.className.split(' ')[0], 'stripped');
        this._domService.addClassToElementByClassName(secondZoneColumn.className.split(' ')[0], 'stripped');
      }

      if (zoneColumnListAdded.length === 1) {
        this._domService.removeClassToElementByClassName('stripped', 'stripped');
        positionClassToEmit = firstZoneColumn.positionClass;
      }
    }

    this.updatePositionClass.emit(positionClassToEmit);
  }

  removed(zoneClassName: ZoneClassName): void {
    this.zoneLine.forEach((zone) => {
      if (zone.className !== zoneClassName) {
        zone.zoneColumns.forEach((column) => {
          this._domService.removeClassToElementByClassName(column.className, 'added');
          this._domService.removeClassToElementByClassName(column.className, 'stripped');
        })
      }
    });
  }
}
