import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {

    public static ContentTypeJson                   = "application/json";
    public static ContentTypeXml                    = "application/xml;";
    public static ContentTypePdf                    = "application/pdf;";
    public static ContentTypeUrlEncoded             = "application/x-www-form-urlencoded;";
    public static ContentTypeMultipart              = "multipart/form-data";
    public static ContentTypeTextPlain              = "text/plain;";
    public static ContentTypeImageJpg               = "image/jpeg;";
    public static ContentTypeImagePng               = "image/png;";
    public static ContentTypeImageGif               = "image/gif;";
    public static EncodingUTF8                      = "UTF-8";
    public static EncodingISO88959                  = "ISO-8859-1";
    public static LangCodeES                        = "es";
    public static UnknownError                      = "Unknown Error";
    public static Anonymous                         = "Anonymous"
    public static paginationDesktop                 = 50;
    public static paginationMobile                  = 20
    public static formatDate                        = "DD-MM-YYYY HH:mm";
    public static simpleDate                        = "DD-MM-YYYY";
    public static snackDuration                     = 4000;
}
