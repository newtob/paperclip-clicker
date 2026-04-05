# Terraform SPEED Engineering Standards

Synechron SPEED enterprise Terraform guidelines. Apply these in addition to `terraform.md`.

Source: `https://backstage.synechron.com/docs/default/component/speed-engineering-guidelines/terraform/` — Synechron SPEED Engineering Guidelines.

## File Structure

### Root (`terraform/`)

| File           | Contents                                       |
| -------------- | ---------------------------------------------- |
| `main.tf`      | Resource group + module calls                  |
| `data.tf`      | All `data` sources (client config, networking) |
| `variables.tf` | Input variables                                |
| `outputs.tf`   | Outputs aggregated from child modules          |
| `versions.tf`  | Provider version constraints                   |
| `providers.tf` | Provider configuration                         |
| `backend.tf`   | Remote state backend                           |
| `locals.tf`    | Local variable names and tags                  |

### environment variables (`variables/`)

- each environment (dev, test, prod) has its own tfvars file with environment-specific variable values  (`dev.tfvars`, `test.tfvars`, `prod.tfvars`).

## Module Structure

- Start with `main.tf`, expand to logically grouped resource files as needed (`networking.tf`, `tagging.tf`, etc.).
- Variables should be defined in their specific `.tf` file alongside the resources that use them, or in `variables.tf`.
- Include a `README.md` in every module with basic documentation, including all variables and outputs.
- Modules should provide example usage in `examples/` — each example in its own folder with a `README.md`.
- Place additional documentation in `docs/`.

## Naming

- Use underscores to separate words in resource names (not dashes or dots). This does not apply to `name` arguments (e.g. DNS names must not contain underscores).
- When multiple resources of the same type exist, use unique descriptive qualifiers (`primary_appgw`, `secondary_appgw`).
- Do not duplicate the resource type in the resource name (`"main"` not `"main_global_address"`).
- Resource nouns must be singular (`web_server` not `web_servers`).
- Name the sole resource of a type `"main"` to simplify references.

## Variables

- Follow the resource definition for variable names, descriptions, and defaults — do not reinvent the wheel.
- Boolean feature flags must be named in the positive (`enable_external_access`, not `disable_external_access`).
- Include units in numeric variable names (`ram_size_gb`, `timeout_seconds`).
- All variables require `name`, `description`, and `type` at minimum.
- Include validation rules for all variables where possible
  (e.g. `validation` blocks like `min`/`max` for numbers, `length` for strings, regex, etc.).
- Provide sensible defaults where possible. Empty defaults only when the underlying resource supports null/empty.
- Only expose variables that need routine changes — do not expose every possible parameter.

## Outputs

- Outputs must reference resource attributes, never pass-through input variables —
  this ensures correct dependency graphs.
- Output all useful values that consuming root modules might need.
- Document all outputs in `README.md`, should use terraform-docs for auto-generation.

## Data Sources & Stateful Resources

- Place data source blocks adjacent to the resource that consumes them.
- Protect stateful resources (databases, storage) with `lifecycle { prevent_destroy = true }`.

## DRY & Conditional Logic

- Use dynamic blocks to eliminate repeated configuration blocks.
- Use the `count` meta-argument for conditional resources and feature flags.

## Formatting

- Run `terraform fmt` before every commit. Automate via pre-commit hook.
- Indent 2 spaces, align equal signs within blocks.

## Reusable Modules

- Version all shared modules using Semantic Versioning (e.g. `v1.0.0`).
- Consumers must pin module versions with constraints (`version = "~> 20.0"`).
- Include an `OWNERS` file at the module root listing maintainer emails.
- Do not include `providers.tf` or `backend.tf` in child modules — these belong in root modules only.
- Declare minimum required provider versions in `versions.tf` within each module using `required_providers`.
- Expose labels/tags as a variable (default empty map) for consumer flexibility.
- Expose at least one output per resource defined in the module.
- Place inline submodules in `modules/$modulename` and treat them as private.
- Store shared modules in a Private Module Registry (Terraform Registry, GitLab, GitHub).

## Root Modules

- Keep root modules under 100 resources (recommend a few dozen).
- Use separate directories per application/project.
- Pin provider versions to a minor version (`version = "~> 4.0.0"`).
- Store variable values in `.tfvars` files.
- Expose outputs via remote state for cross-module consumption.

## Security

- Store statefiles in cloud storage (S3, Azure Blob, GCS) — never in version control.
- Encrypt statefiles with customer-supplied encryption keys (KMS, Key Vault, GOOGLE_ENCRYPTION_KEY).
- Limit state access to the build system and highly privileged administrators only.
- Add `*.tfstate` and `*.tfstate.*` to `.gitignore`.
- Never commit secrets. Use secrets managers (AWS Secrets Manager, Azure Key Vault, GCP Secret Manager) and reference via data blocks or variables.
- Mark sensitive outputs with `sensitive = true`.
- Use Service Accounts with least-privilege for Terraform authentication — avoid user accounts.
- Run pre-apply policy checks (Open Policy Agent, HashiCorp Sentinel) against `terraform plan` JSON output in CI/CD.

## Testing

- Start with static analysis: `terraform fmt`, `terraform validate`, TFLint, Conftest, Checkov.
- Use established testing frameworks: Terratest, Kitchen-Terraform, Inspec.
- Write module integration tests — deploy to a dev/test environment, verify, then destroy.
- Build end-to-end tests deploying full architectures to production-like environments.
- Use BDD/post-deployment tests with cloud SDKs (e.g. Boto3) and frameworks (e.g. behave) for runtime verification.
- Randomize variable inputs using the `hashicorp/random` provider to avoid naming conflicts.
- Always test in development environments — never production.

## Recommended Toolchain

- **secrets detection:** gitleaks
- **Linting:** TFLint, kics
- **Documentation:** terraform-docs
- **Testing:** Terratest

## OpenTofu

Opentofu is used instead of Terraform. All the terraform rules apply.
