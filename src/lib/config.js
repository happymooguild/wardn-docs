// Central site config. Swap these for the real values.
export const GITHUB_URL = 'https://github.com/happymooguild/wardn'

// ArgoCD notifications ConfigMap shown in the Detection section + docs.
export const GITOPS_YAML = `apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  service.webhook.wardn: |
    url: https://wardn.yourco.com/api/v1/deployments
    headers:
    - name: Authorization
      value: Bearer $wardn-api-key
  trigger.on-deployed: |
    - when: app.status.operationState.phase in ['Succeeded']
        and app.status.health.status == 'Healthy'
      send: [app-deployed]
  subscriptions: |
    - recipients: [webhook:wardn]
      triggers: [on-deployed]`
