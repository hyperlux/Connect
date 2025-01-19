# Registration System Issues Report

## Current Situation

The registration system is experiencing issues in the production environment. While the service worker is registering successfully and the frontend is accessible, user registration attempts are failing with a 500 Internal Server Error.

### Error Details

1. Service Worker Status:
```
ServiceWorker registration successful with scope: https://auroville.social/
Service Worker registered: ServiceWorkerRegistration
```

2. Registration Error:
```
POST https://api.auroville.social/api/auth/register 500 (Internal Server Error)
Server error: {message: 'Registration failed. Database error.'}
```

3. Specific Database Error:
```
Invalid `prisma.user.create()` invocation:
...verificationToken`? Available options are marked with ?.
```

## Root Cause Analysis

The error appears to stem from a mismatch between the Prisma schema field names and the actual database column names. Specifically:

1. Schema Definition:
```prisma
verificationCode String?        @map("verificationToken")
```

2. Code Usage:
The backend is attempting to use `verificationToken` in the create operation, but Prisma expects `verificationCode` as per the schema definition.

## Impact

1. User Experience:
   - New users cannot register
   - Error messages are not user-friendly
   - Registration process is blocked

2. System Health:
   - Backend is operational but registration endpoint is failing
   - Database schema and code are misaligned
   - Service worker and frontend are functioning correctly

## Potential Solutions

### Immediate Fix

1. Update auth.mjs to use correct field name:
```javascript
const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    emailVerified: false,
    verificationCode: verificationCode  // Changed from verificationToken
  }
});
```

### Long-term Improvements

1. Database Schema Management:
   - Create a migration to standardize field naming
   - Consider removing @map directive for clarity
   - Document field naming conventions

2. Error Handling:
   - Add better error messages for database issues
   - Implement error logging with stack traces
   - Add monitoring for registration failures

3. Development Process:
   - Add schema validation tests
   - Implement pre-deployment checks
   - Create development environment matching production

## Implementation Plan

1. Immediate Actions:
   - Update auth.mjs with correct field names
   - Test registration flow in staging
   - Monitor error rates after deployment

2. Short-term Tasks:
   - Add error logging
   - Update error messages
   - Document schema changes

3. Long-term Tasks:
   - Review and standardize database schema
   - Implement automated testing
   - Set up monitoring

## Monitoring Plan

1. Key Metrics to Track:
   - Registration success/failure rate
   - Database error frequency
   - API response times
   - Error log patterns

2. Alert Conditions:
   - Registration failure rate > 5%
   - Database errors > 1%
   - API response time > 2s

## Next Steps

1. Immediate:
   - Apply the field name fix
   - Deploy to staging
   - Test registration flow
   - Monitor error rates

2. This Week:
   - Review all Prisma schema mappings
   - Update documentation
   - Add error monitoring

3. Next Sprint:
   - Implement automated tests
   - Review error handling
   - Plan schema standardization

## Additional Notes

- The service worker registration is working correctly
- Frontend routing and UI are functioning as expected
- Email service configuration appears correct
- Database connections are stable

## References

- Prisma Schema: `prisma/schema.prisma`
- Auth Route: `server/routes/auth.mjs`
- Registration Component: `src/pages/Register.tsx`
- Auth Hook: `src/lib/auth.ts`

## Contact

For urgent issues related to this system:
- DevOps: support@auroville.social
- Backend: backend@auroville.social
- Frontend: frontend@auroville.social
