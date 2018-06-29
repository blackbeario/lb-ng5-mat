export class ApiConfig {
  private static path: string = '//localhost:3000';
  private static fileServer: string = '//localhost:3000/api/server/storage';
  private static defaultMediaUploadPath: string = '//localhost:3000/api/server/storage/public/upload';
  private static defaultMediaUploadMaxFilesize: number = 2; //2MB
  private static version: string | number = 'api';
  private static authPrefix: string = '';
  private static debug: boolean = true;
  private static adminRoles: string[] = [
    'administrator'
  ];
  private static nodePublishedOptions: any[] = [
    {title: "Publish", status: 1},
    {title: "Unpublished", status: 0}
  ];

  public static getNodePublishedOptions(): any[] {
    return ApiConfig.nodePublishedOptions;
  }

  public static setApiVersion(version: string = 'api'): void {
    ApiConfig.version = version;
  }

  public static getApiVersion(): string | number {
    return ApiConfig.version;
  }

  public static setBaseURL(url: string = '/'): void {
    ApiConfig.path = url;
  }

  public static getPath(): string {
    return ApiConfig.path;
  }

  public static getFileServer(): string {
    return ApiConfig.fileServer;
  }

  public static setAuthPrefix(authPrefix: string = ''): void {
    ApiConfig.authPrefix = authPrefix;
  }

  public static getAuthPrefix(): string {
    return ApiConfig.authPrefix;
  }

  public static setDebugMode(isEnabled: boolean): void {
    ApiConfig.debug = isEnabled;
  }

  public static debuggable(): boolean {
    return ApiConfig.debug;
  }

  public static  getAdminRoles(): string[] {
    return ApiConfig.adminRoles;
  }

  public static getMediaUploadPath(): string {
    return ApiConfig.defaultMediaUploadPath;
  }

  public static getDefaultMediaUploadMaxFilesize(): number {
    return ApiConfig.defaultMediaUploadMaxFilesize;
  }

}