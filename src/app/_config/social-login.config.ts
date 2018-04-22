import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('2151087568251340')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('939497386985-2vpejebivle450nn98n541navpssuql1.apps.googleusercontent.com')
        },
      ]
  );
  return config;

  // 939497386985-2vpejebivle450nn98n541navpssuql1.apps.googleusercontent.com
  // XZPq8UtIxXGIw5kGvBlkO3E4

}
