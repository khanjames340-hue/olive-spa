const { test } = require('node:test')
const assert = require('node:assert/strict')
const { validateBooking, todayIn, addDays, isRealDate } = require('../validation')

const TODAY = '2026-09-29'
const valid = {
  fullName: 'Amina Okello',
  phone: '+211 912 345 678',
  email: 'amina@example.com',
  serviceId: 'swedish-massage',
  serviceName: 'Swedish Massage',
  price: 45,
  preferredDate: '2026-10-01',
  preferredTime: '10:00 AM',
  notes: '',
}

test('accepts a valid booking and derives a digits-only phone key', () => {
  const { data, errors } = validateBooking(valid, TODAY)
  assert.deepEqual(errors, {})
  assert.equal(data.phoneKey, '211912345678')
  assert.equal(data.price, 45)
})

test('email is optional but must be valid when given', () => {
  assert.deepEqual(validateBooking({ ...valid, email: '' }, TODAY).errors, {})
  assert.ok(validateBooking({ ...valid, email: 'not-an-email' }, TODAY).errors.email)
})

test('rejects past, far-future and impossible dates', () => {
  assert.equal(
    validateBooking({ ...valid, preferredDate: '2026-09-28' }, TODAY).errors.preferredDate,
    'Please choose today or a future date.'
  )
  assert.deepEqual(validateBooking({ ...valid, preferredDate: TODAY }, TODAY).errors, {})
  assert.ok(validateBooking({ ...valid, preferredDate: '2027-12-01' }, TODAY).errors.preferredDate)
  assert.ok(validateBooking({ ...valid, preferredDate: '2026-02-30' }, TODAY).errors.preferredDate)
})

test('rejects missing name, bad phone and missing service', () => {
  const { errors } = validateBooking({ ...valid, fullName: ' ', phone: 'call me', serviceId: '' }, TODAY)
  assert.ok(errors.fullName)
  assert.ok(errors.phone)
  assert.ok(errors.serviceId)
})

test('clamps untrusted prices and trims long text', () => {
  assert.equal(validateBooking({ ...valid, price: 999999 }, TODAY).data.price, 0)
  assert.equal(validateBooking({ ...valid, price: 'abc' }, TODAY).data.price, 0)
  assert.equal(validateBooking({ ...valid, notes: 'x'.repeat(5000) }, TODAY).data.notes.length, 1000)
  assert.equal(validateBooking({ ...valid, fullName: { $gt: '' } }, TODAY).errors.fullName, 'Please enter your full name.')
})

test('date helpers', () => {
  assert.equal(addDays('2026-12-31', 1), '2027-01-01')
  assert.equal(isRealDate('2028-02-29'), true)
  assert.equal(isRealDate('2026-02-29'), false)
  // 23:30 UTC on Sep 29 is already Sep 30 in Juba (UTC+2)
  assert.equal(todayIn('Africa/Juba', new Date('2026-09-29T23:30:00Z')), '2026-09-30')
})
