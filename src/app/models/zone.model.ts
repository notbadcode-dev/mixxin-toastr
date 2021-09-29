import { PositionClass, ZoneClassName, ZoneColumnType } from "../enums/zone.enum";

export interface ZoneLine {
    className: ZoneClassName.top | ZoneClassName.center | ZoneClassName.bottom,
    zoneColumns: ZoneColumn[],
    active?: boolean
}

export interface ZoneColumn {
    className: string,
    zoneColumnType: ZoneColumnType,
    positionClass:
        PositionClass.topLeft | PositionClass.topMiddle | PositionClass.topRight | PositionClass.topFull |
        PositionClass.centerLeft | PositionClass.centerMiddle | PositionClass.centerRight | PositionClass.centerFull |
        PositionClass.bottomLeft | PositionClass.bottomMiddle | PositionClass.bottomRight | PositionClass.bottomFull,
    available?: boolean,
    active?: boolean,
}