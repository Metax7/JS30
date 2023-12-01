import {notification} from "antd";

const openNotificationWithIcon = (type,message,description,duration, placement) => {
    duration = duration || 6
    placement = placement || "topRight"
    notification[type]({message,description,duration, placement
           });
};
export const successNotification = (msg, description, duration, placement) =>{

    openNotificationWithIcon("success",msg,description,duration, placement)
}
export const errorNotification = (msg, description,duration, placement) =>{
    openNotificationWithIcon("error",msg,description,duration,placement)
}
export const warningNotification = (msg, description,duration, placement) =>{
    openNotificationWithIcon("warning",msg,description,duration, placement)
}
export const infoNotification = (msg, description,duration, placement) =>{
    openNotificationWithIcon("info",msg,description,duration, placement)
}