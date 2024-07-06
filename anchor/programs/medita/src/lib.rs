#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("3wNGqd1kUQEooWZ5QpNeZVRnxvy8DETgzyCM9bqaDWLb");

#[account]
#[derive(InitSpace)]
pub struct PatientInfo {
    pub owner: Pubkey,

    #[max_len(32)]
    pub last_name: String,

    #[max_len(32)]
    pub first_name: String,

    #[max_len(32)]
    pub email: String,

    #[max_len(32)]
    pub phone_number: String,

    #[max_len(32)]
    pub address: String,

    #[max_len(15)]
    pub insurance_id: String,

    // Optional Field
    #[max_len(32)]
    pub disease: String,

    // Optional Field
    #[max_len(50)]
    pub prescription: String,
}

#[derive(Accounts)]
#[instruction(insurance_id: String)]
pub struct CreatePatient<'info> {
    #[account(
        init,
        seeds = [insurance_id.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + 321,
    )]
    pub patient_info: Account<'info, PatientInfo>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(insurance_id: String)]
pub struct UpdatePatient<'info> {
    #[account(
        mut,
        seeds = [insurance_id.as_bytes(), owner.key().as_ref()],
        bump,
        realloc = 8 + 321,
        realloc::payer = owner,
        realloc::zero = true,
    )]
    pub patient_info: Account<'info, PatientInfo>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}


impl PatientInfo {
  pub fn update(
      &mut self,
      last_name: Option<String>,
      first_name: Option<String>,
      email: Option<String>,
      phone_number: Option<String>,
      address: Option<String>,
      disease: Option<String>,
      prescription: Option<String>
  ) {
      if let Some(last_name) = last_name {
          self.last_name = last_name;
      }
      if let Some(first_name) = first_name {
          self.first_name = first_name;
      }
      if let Some(email) = email {
          self.email = email;
      }
      if let Some(phone_number) = phone_number {
          self.phone_number = phone_number;
      }
      if let Some(address) = address {
          self.address = address;
      }
      if let Some(disease) = disease {
          self.disease = disease;
      }
      if let Some(prescription) = prescription {
          self.prescription = prescription;
      }
  }
}

#[derive(Accounts)]
#[instruction(insurance_id: String)]
pub struct DeletePatient<'info> {
    #[account(
        mut,
        seeds = [insurance_id.as_bytes(), owner.key().as_ref()],
        bump,
        close = owner,
    )]
    pub patient_info: Account<'info, PatientInfo>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[program]
pub mod medita {
    use super::*;

    pub fn create_patient(
        ctx: Context<CreatePatient>,
        insurance_id: String,
        last_name: String,
        first_name: String,
        email: String,
        phone_number: String,
        address: String,
    ) -> Result<()> {
        let patient_info: &mut Account<PatientInfo> = &mut ctx.accounts.patient_info;
        patient_info.owner = ctx.accounts.owner.key();
        patient_info.insurance_id = insurance_id;
        patient_info.last_name = last_name;
        patient_info.first_name = first_name;
        patient_info.email = email;
        patient_info.phone_number = phone_number;
        patient_info.address = address;

        Ok(())
    }

    pub fn update_patient(
        ctx: Context<UpdatePatient>,
        _insurance_id: String, // seed for PDA
        last_name: Option<String>,
        first_name: Option<String>,
        email: Option<String>,
        phone_number: Option<String>,
        address: Option<String>,
        disease: Option<String>,
        prescription: Option<String>,
    ) -> Result<()> {
        let patient_info: &mut Account<PatientInfo> = &mut ctx.accounts.patient_info;
        patient_info.update(
            last_name,
            first_name,
            email,
            phone_number,
            address,
            disease,
            prescription
        );
        Ok(())
    }

    pub fn delete_patient(
        _ctx: Context<DeletePatient>,
        _insurance_id: String,
    ) -> Result<()>{
        Ok(())
    }
}
