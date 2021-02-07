import { shallowMount } from "@vue/test-utils";
import BookingStay from "@/components/BookingStay.vue";

describe("BookingStay.vue", () => {
  it("renders props.price when passed", () => {
    const currency = 'PLN';
    const price = 298;
    const locale = 'pl';
    const datesFree = [];
    const datesBusy = [];
    const wrapper = shallowMount(BookingStay, {
      propsData: { currency, price, locale, datesBusy, datesFree}
    });
    expect(wrapper.text()).toMatch(price.toString());
  });
});
